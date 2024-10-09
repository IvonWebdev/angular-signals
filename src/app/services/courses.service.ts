import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpContext } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { firstValueFrom } from 'rxjs';
import { Course } from '../models/course.model';
import { GetCoursesResponse } from '../models/get-courses.response';
import { SkipLoading } from './skip-loading';

@Injectable({
    providedIn: 'root',
})
export class CoursesService {
    http = inject(HttpClient);
    env = environment;

    public async getAllCourses(): Promise<Course[]> {
        const courses$ = this.http.get<GetCoursesResponse>(`${this.env.apiRoot}/courses`, {
            context: new HttpContext().set(SkipLoading, true),
        });
        const response = await firstValueFrom(courses$);
        return response.courses;
    }

    createCourse(course: Partial<Course>): Promise<Course> {
        const course$ = this.http.post<Course>(`${this.env.apiRoot}/courses`, course);
        return firstValueFrom(course$);
    }

    saveCourse(courseId: string, changes: Partial<Course>): Promise<Course> {
        const course$ = this.http.put<Course>(`${this.env.apiRoot}/courses/${courseId}`, changes);
        return firstValueFrom(course$);
    }

    deleteCourse(courseId: string) {
        const delete$ = this.http.delete<Course>(`${this.env.apiRoot}/courses/${courseId}`);
        return firstValueFrom(delete$);
    }
}
