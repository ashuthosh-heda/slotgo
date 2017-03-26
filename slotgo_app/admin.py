from django.contrib import admin

from .models import *

admin.site.register(User)
admin.site.register(Batch)
admin.site.register(BatchSubject)
admin.site.register(StudentInfo)
admin.site.register(FacultyInfo)
admin.site.register(Subject)
admin.site.register(SubjectFaculty)
admin.site.register(Notes)
