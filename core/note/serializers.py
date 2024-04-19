from rest_framework import serializers
from .models import Topic, Note


class TopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = ['id', 'name', 'deleted']
        read_only_fields = ['id', 'deleted']


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ['id', 'topic', 'content', 'created_at', 'updated_at', 'deleted']
        read_only_fields = ['id', 'created_at', 'updated_at', 'deleted']
