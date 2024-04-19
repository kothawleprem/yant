from django.contrib.auth.models import User
from django.db import models


class SoftDeletionManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(deleted=False)


class SoftDeletionModel(models.Model):
    deleted = models.BooleanField(default=False)

    objects = SoftDeletionManager()
    all_objects = models.Manager()

    def delete(self, using=None, keep_parents=False):
        self.deleted = True
        self.save()

    class Meta:
        abstract = True


class Topic(SoftDeletionModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Note(SoftDeletionModel):
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
