from django.urls import path
from .views import TopicView, TopicDetailView, NoteView, NoteDetailView, NotesByTopicIdView, GlobalQueryView, TopicQueryView, RecommendNotesView, GlobalChatView, TopicChatView, RewriteView

urlpatterns = [
    path('topics/', TopicView.as_view(), name='topic-list'),
    path('topics/<int:pk>/', TopicDetailView.as_view(), name='topic-detail'),

    path('notes/', NoteView.as_view(), name='note-list'),
    path('notes/<int:pk>/', NoteDetailView.as_view(), name='note-detail'),
    path('notes/by-topic/<int:topic_id>/', NotesByTopicIdView.as_view(), name='notes-by-topic-id'),

    path('query/<str:query>', GlobalQueryView.as_view(), name='global-query'),
    path('query/by-topic/<int:topic_id>', TopicQueryView.as_view(), name='query-by-topic-id'),

    path('recommended-notes/by-note/<int:note_id>', RecommendNotesView.as_view(), name='recommend-notes'),

    path('chat/global/', GlobalChatView.as_view(), name='global-chat'),
    path('chat/topic/<int:topic_id>', TopicChatView.as_view(), name='global-chat'),

    path('transformation/note/<int:note_id>/rewrite/<str:tone>', RewriteView.as_view(), name='rewrite')
]
