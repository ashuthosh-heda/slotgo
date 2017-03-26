from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import AbstractUser

def notes_directory_path(instance, filename):
    return 'notes/{0}-{1}'.format(instance.title, filename)

class User(AbstractUser):
    contact_number = models.CharField(max_length=10)
    gender = models.CharField(max_length=6)
    is_faculty = models.NullBooleanField()

class Batch(models.Model):
    batch = models.IntegerField()
    sem_number = models.IntegerField()

    def __str__(self):
        return str(self.batch) + "--" + str(self.sem_number)

class StudentInfo(models.Model):
    student_id = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    batch_id = models.ForeignKey(Batch, on_delete=models.CASCADE)
    relation = models.CharField(max_length=20)
    relative_name = models.CharField(max_length=32)
    relative_phone_number = models.CharField(max_length=10)

    def __str__(self):
        return str(self.student_id.username)

class FacultyInfo(models.Model):
    faculty_id = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    post = models.CharField(max_length=20) # Should get faculty post choices

    def __str__(self):
        return str(self.faculty_id.username)

class Subject(models.Model):
    name = models.CharField(max_length=128)
    abbreviation = models.CharField(max_length=10)

    def __str__(self):
        return str(self.abbreviation)

class SubjectFaculty(models.Model):
    subject_id = models.ForeignKey(Subject, on_delete=models.CASCADE)
    faculty_id = models.ForeignKey(FacultyInfo, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.subject_id.abbreviation) + " - " + str(self.faculty_id.faculty_id.first_name)

class BatchSubject(models.Model):
    batch_id = models.ForeignKey(Batch)
    subject_id = models.ForeignKey(Subject)

    def __str__(self):
        return str(self.batch_id.batch) + "-" + str(self.batch_id.sem_number) + ":" + str(self.subject_id.name)

class Notes(models.Model):
    submitted_by = models.ForeignKey(FacultyInfo)
    subject_id = models.ForeignKey(Subject, on_delete=models.CASCADE)
    title = models.TextField()
    file = models.FileField(upload_to=notes_directory_path)
    upload_date = models.DateTimeField(auto_now=True)
    created_date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.title)

class Downloads(models.Model):
    user_id = models.ForeignKey(User)
    notes_id = models.ForeignKey(Notes)
    time_stamp = models.DateTimeField(auto_now_add=True, blank=True)

    def __str__(self):
        return str(self.user_id.username) + "-" + str(self.notes_id.title)