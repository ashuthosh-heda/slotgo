import json

from django.contrib.auth import authenticate, login, logout

from slotgo_app.models import *
from slotgo_app.permissions import *
from slotgo_app.serializers import *

#from rest_framework import generics
from rest_framework import viewsets, status, views, permissions
from rest_framework.response import Response
from rest_framework.parsers import FormParser, MultiPartParser

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.AllowAny(),)

        if self.request.method == 'POST':
            return (permissions.AllowAny(),)

        return (permissions.IsAuthenticated(), IsUserOwner(),)

    def create(self, request):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            user = User.objects.create_user(**serializer.validated_data)
            userData = dict(serializer.validated_data)
            userId = dict({'id':user.id})
            userData.update(userId)
            return Response(userData, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(views.APIView):
    def post(self, request, format=None):
        data = json.loads(request.body)

        username = data.get('username', None)
        password = data.get('password', None)

        user = authenticate(username=username, password=password)

        if user is not None:
            if user.is_active:
                login(request, user)

                serialized = UserSerializer(user)

                return Response(serialized.data)
            else:
                return Response({
                    'status': 'Unauthorized',
                    'message': 'This user has been disabled.'
                }, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({
                'status': 'Unauthorized',
                'message': 'Username/password combination invalid.'
            }, status=status.HTTP_401_UNAUTHORIZED)

class LogoutView(views.APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, format=None):
        logout(request)

        return Response({}, status=status.HTTP_204_NO_CONTENT)

class BatchViewSet(viewsets.ModelViewSet):
    queryset = Batch.objects.all()
    serializer_class = BatchSerializer

class BatchSubjectViewSet(viewsets.ModelViewSet):
    queryset = BatchSubject.objects.all()
    serializer_class = BatchSubjectSerializer

class NotesViewSet(viewsets.ModelViewSet):
    queryset = Notes.objects.all()
    serializer_class = NotesSerializer
    parser_classes = (FormParser, MultiPartParser,)

class SubjectViewSet(viewsets.ModelViewSet):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer

class StudentViewSet(viewsets.ModelViewSet):
    queryset = StudentInfo.objects.all()
    serializer_class = StudentInfoSerializer

class FacultyViewSet(viewsets.ModelViewSet):
    queryset = FacultyInfo.objects.all()
    serializer_class = FacultyInfoSerializer

class FacultyUserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().filter(is_faculty="true")
    serializer_class = UserSerializer

class SubjectFacultyViewSet(viewsets.ModelViewSet):
    queryset = SubjectFaculty.objects.all()
    serializer_class = SubjectFacultySerializer

class DownloadsViewSet(viewsets.ModelViewSet):
    queryset = Downloads.objects.all()
    serializer_class = DownloadsSerializer