import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Course } from '../models/course.model';
import { deleteCourse } from '../../../server/delete-course.route';

@Injectable({
    providedIn: 'root',
})
export class CoursesServiceWithFetch {
    env = environment;

    async getAllCourses(): Promise<Course[]> {
        const response = await fetch(`${this.env.apiRoot}/courses`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const payload = await response.json();
        return payload.courses;
    }

    async createCourse(course: Partial<Course>): Promise<Course> {
        const response = await fetch(`${this.env.apiRoot}/courses`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(course),
        });

        return response.json();
    }

    async saveCourse(courseId: string, course: Partial<Course>): Promise<Course> {
        const response = await fetch(`${this.env.apiRoot}/courses/${courseId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(course),
        });

        return await response.json();
    }

    async deleteCourse(courseId: string): Promise<void> {
        const response = await fetch(`${this.env.apiRoot}/courses/${courseId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    }
}
