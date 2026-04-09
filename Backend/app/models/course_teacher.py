from sqlalchemy import Column, ForeignKey, Table

from app.db.base import Base

course_teachers = Table(
    "course_teachers",
    Base.metadata,
    Column("course_id", ForeignKey("courses.id", ondelete="CASCADE"), primary_key=True),
    Column(
        "teacher_id", ForeignKey("teachers.id", ondelete="CASCADE"), primary_key=True
    ),
)

