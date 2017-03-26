from slotgo_app.models import *
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'password', 'username', 'password', 'first_name', 'last_name', 'email', 'is_faculty', 'contact_number', 'gender', 'is_superuser')
        
        def create(self, validated_data):
            user = super(UserSerializer, self).create(validated_data)
            user.set_password(validated_data['password'])
            user.save()
            return user

        def update(self, instance, validated_data):
            instance.username = validated_data.get('username', instance.username)
            instance.save()

            update_session_auth_hash(self.context.get('request'), instance)

            return instance

class BatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Batch

class BatchSubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = BatchSubject

    def create(self, validated_data):
        try:
            bs1 = BatchSubject.objects.get(subject_id=validated_data['subject_id'],
                                         batch_id=validated_data['batch_id'])
            if bs1:
                raise serializers.ValidationError("Entry Already Exists")
        except BatchSubject.DoesNotExist:
            pass

        batchsubject = super(BatchSubjectSerializer, self).create(validated_data)
        batchsubject.save()
        return batchsubject

class NotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notes

class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject

    def create(self, validated_data):
        try:
            sub = Subject.objects.get(name=validated_data['name'])
            if sub:
                raise serializers.ValidationError("Entry Already Exists")
        except Subject.DoesNotExist:
            pass

        subject = super(SubjectSerializer, self).create(validated_data)
        subject.save()
        return subject

class StudentInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentInfo
        
    def create(self, validated_data):
        try:
            validated_data['student_id'] = User.objects.get(pk=validated_data['student_id'])
            print "CAME HERE"
        except User.DoesNotExist:
            raise serializers.ValidationError("User not found")
        studentinfo = super(StudentInfoSerializer, self).create(validated_data)
        studentinfo.save()
        return studentinfo

    def update(self, instance, validated_data):
        try:
            instance.student_id = User.objects.get(pk=validated_data['student_id'])
            instance.batch_id = validated_data['batch_id']
            instance.relation = validated_data['relation']
            instance.relative_name = validated_data['relative_name']
            instance.relative_phone_number = validated_data['relative_phone_number']
            print "CAME HERE"
        except User.DoesNotExist:
            raise serializers.ValidationError("User not found")
        instance.save()
        return instance

class FacultyInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = FacultyInfo

    def create(self, validated_data):
        try:
            validated_data['faculty_id'] = User.objects.get(pk=validated_data['faculty_id'],
                                                            is_faculty=1)
        except User.DoesNotExist:
            raise serializers.ValidationError("User Not Found or user not faculty")
        facultyinfo = super(FacultyInfoSerializer, self).create(validated_data)
        facultyinfo.save()
        return facultyinfo

    def update(self, instance, validated_data):
        try:
            instance.faculty_id = User.objects.get(pk=validated_data['faculty_id'],is_faculty=1)
            instance.post = validated_data['post']
        except User.DoesNotExist:
            raise serializers.ValidationError("User not found")
        instance.save()
        return instance


class SubjectFacultySerializer(serializers.ModelSerializer):
    class Meta:
        model = SubjectFaculty

    def create(self, validated_data):
        try:
            sf1 = SubjectFaculty.objects.get(subject_id=validated_data['subject_id'],
                                         faculty_id=validated_data['faculty_id'])
            if sf1:
                raise serializers.ValidationError("Entry Already Exists")
        except SubjectFaculty.DoesNotExist:
            pass

        subjectfaculty = super(SubjectFacultySerializer, self).create(validated_data)
        subjectfaculty.save()
        return subjectfaculty

class DownloadsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Downloads

    def create(self, validated_data):
        try:
            down = Downloads.objects.get(user_id=validated_data['user_id'],
                                         notes_id=validated_data['notes_id'])
            if down:
                raise serializers.ValidationError("Entry Already Exists")
        except Downloads.DoesNotExist:
            pass

        downloads = super(DownloadsSerializer, self).create(validated_data)
        downloads.save()
        return downloads