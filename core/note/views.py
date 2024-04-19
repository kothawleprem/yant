from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.exceptions import NotFound
from .models import Topic, Note
from .serializers import TopicSerializer, NoteSerializer
from .utils import create_index, query_corpus, chat_corpus, rewrite_note
import json


class TopicView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        topics = Topic.objects.filter(user=user)
        serializer = TopicSerializer(topics, many=True)
        return Response(serializer.data)

    def post(self, request):
        user = request.user
        name = request.data.get("name")

        if Topic.objects.filter(user=user, name=name, deleted=False).exists():
            return Response({"error": "You already have an active topic with the same name"}, status=status.HTTP_400_BAD_REQUEST)
        serializer = TopicSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TopicDetailView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            topic = Topic.objects.get(pk=pk, user=self.request.user)
            return topic
        except Topic.DoesNotExist:
            raise NotFound("Topic not found")
 
    def get(self, request, pk):
        topic = self.get_object(pk)
        serializer = TopicSerializer(topic)
        return Response(serializer.data)

    def put(self, request, pk):
        topic = self.get_object(pk)
        serializer = TopicSerializer(topic, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        topic = self.get_object(pk)
        topic.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class NoteView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        serializer = NoteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            try:
                Topic.objects.get(id=serializer.data["topic"], user=user,)
            except Exception as e:
                # print(e)
                return Response({"message": "User not member of this topic"}, status=status.HTTP_401_UNAUTHORIZED)
            create_index(user.id, serializer.data["id"], serializer.data["topic"], serializer.data["content"])
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class NoteDetailView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get_object(self, pk):
        try:
            return Note.objects.get(pk=pk)
        except Note.DoesNotExist:
            raise NotFound("Note not found")

    def get(self, request, pk):
        note = self.get_object(pk)
        
        user = request.user
        if note.topic.user != user:
            return Response({"error": "You do not have permission to access this note"}, status=status.HTTP_403_FORBIDDEN)
        serializer = NoteSerializer(note)
        return Response(serializer.data)

    def put(self, request, pk):
        note = self.get_object(pk)
        user = request.user
        if note.topic.user != user:
            return Response({"error": "You do not have permission to access this note"}, status=status.HTTP_403_FORBIDDEN)
        serializer = NoteSerializer(note, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        note = self.get_object(pk)
        user = request.user
        if note.topic.user != user:
            return Response({"error": "You do not have permission to access this note"}, status=status.HTTP_403_FORBIDDEN)
        note.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class NotesByTopicIdView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, topic_id):
        user = request.user
        try:
            topic = Topic.objects.get(pk=topic_id, user=user)
        except Topic.DoesNotExist:
            return Response({"error": "Topic not found"}, status=status.HTTP_404_NOT_FOUND)
        
        notes = Note.objects.filter(topic=topic)
        serializer = NoteSerializer(notes, many=True)
        return Response(serializer.data)


class GlobalQueryView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, query):
        user = request.user
        print(query, user.id)
        metadata_filter = f"doc.user_id = {user.id}"
        response = query_corpus(query, metadata_filter, 5, "DEFAULT")
        print(response.text)
        json_object = json.loads(response.text)
        responses = json_object['responseSet'][0]['response']
        metadata = json_object['responseSet'][0]['document']
        res = {
            "responses": responses,
            "metadata": metadata
        }
        return Response(res, status=status.HTTP_200_OK)


class TopicQueryView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, query, topic_id):
        user = request.user
        # print(query, user.id)
        metadata_filter = f"doc.user_id = {user.id} AND doc.topic_id = {topic_id}"
        response = query_corpus(query, metadata_filter, 5, "DEFAULT")
        print(response.text)
        json_object = json.loads(response.text)
        responses = json_object['responseSet'][0]['response']
        metadata = json_object['responseSet'][0]['document']
        res = {
            "responses": responses,
            "metadata": metadata
        }
        return Response(res, status=status.HTTP_200_OK)


class RecommendNotesView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, note_id):
        user = request.user
        query = Note.objects.filter(id=note_id)[0]
        # print(query, user.id)
        metadata_filter = f"doc.user_id = {user.id}"
        response = query_corpus(query, metadata_filter, 5, "RESPONSE")
        print(response.text)
        json_object = json.loads(response.text)
        responses = json_object['responseSet'][0]['response']
        metadata = json_object['responseSet'][0]['document']
        res = {
            "responses": responses,
            "metadata": metadata
        }
        return Response(res, status=status.HTTP_200_OK)


class GlobalChatView(APIView):

    def post(self, request):
        user = request.user
        query = request.data["query"]
        conversation_id = request.data['conversation_id']
        metadata_filter = f"doc.user_id = {user.id}"
        response = chat_corpus(query, metadata_filter, 5, "DEFAULT", conversation_id)
        print(response.text)
        json_object = json.loads(response.text)
        responses = json_object['responseSet'][0]['response']
        metadata = json_object['responseSet'][0]['document']
        res = {
            "responses": responses,
            "metadata": metadata
        }
        return Response(res, status=status.HTTP_200_OK)


class TopicChatView(APIView):

    def post(self, request):
        user = request.user
        query = request.data["query"]
        conversation_id = request.data['conversation_id']
        metadata_filter = f"doc.user_id = {user.id}"
        response = chat_corpus(query, metadata_filter, 5, "DEFAULT", conversation_id)
        print(response.text)
        json_object = json.loads(response.text)
        responses = json_object['responseSet'][0]['response']
        metadata = json_object['responseSet'][0]['document']
        res = {
            "responses": responses,
            "metadata": metadata
        }
        return Response(res, status=status.HTTP_200_OK)


class RewriteView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, note_id, tone):
        try:
            note = Note.objects.get(id=note_id)
        except:
            return Response("Note not found", status=status.HTTP_404_NOT_FOUND)
        note_content = note.content
        print(note_content)
        content = rewrite_note(note_content, tone)
        response = {
            'content': content
        }
        return Response(response, status=status.HTTP_200_OK)
