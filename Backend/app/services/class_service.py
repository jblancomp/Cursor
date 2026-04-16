from typing import List, Optional, Dict, Any
from sqlalchemy.orm import Session, joinedload
from app.models.lesson import Lesson

class ClassService:
    """
    Service class for handling class-related operations.
    Implements the contract specifications for class endpoints.
    """

    def __init__(self, db: Session):
        self.db = db

    def get_class_by_id(self, class_id: int) -> Optional[Dict[str, Any]]:
        """
        Get class (lesson) details by ID.
        
        Args:
            class_id: The class ID
            
        Returns:
            Class dictionary with video and details, or None if not found
        """
        lesson = (
            self.db.query(Lesson)
            .filter(Lesson.id == class_id)
            .filter(Lesson.deleted_at.is_(None))
            .first()
        )
        
        if not lesson:
            return None
            
        return {
            "id": lesson.id,
            "title": lesson.name,
            "description": lesson.description,
            "slug": lesson.slug,
            "video": lesson.video_url,
            "course_slug": lesson.course.slug
        } 