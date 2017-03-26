from rest_framework import routers
from views import *

api_router = routers.SimpleRouter()
api_router.register('user', UserViewSet)
api_router.register('batch', BatchViewSet)
api_router.register('batch-subject', BatchSubjectViewSet)
api_router.register('notes', NotesViewSet)
api_router.register('subject', SubjectViewSet)
api_router.register('student', StudentViewSet)
api_router.register('faculty', FacultyViewSet)
api_router.register('faculty-user', FacultyUserViewSet)
api_router.register('subject-faculty', SubjectFacultyViewSet)
api_router.register('downloads', DownloadsViewSet)
