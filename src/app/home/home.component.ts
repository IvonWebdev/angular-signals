import { afterNextRender, Component, computed, effect, inject, Injector, signal } from '@angular/core';
// import { CoursesServiceWithFetch } from '../services/courses-fetch.service';
import { CoursesService } from '../services/courses.service';
import { Course, sortCoursesBySeqNo } from '../models/course.model';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { CoursesCardListComponent } from '../courses-card-list/courses-card-list.component';
import { MatDialog } from '@angular/material/dialog';
// import { MessagesService } from '../messages/messages.service';
// import { catchError, from, throwError } from 'rxjs';
// import { toObservable, toSignal, outputToObservable, outputFromObservable } from '@angular/core/rxjs-interop';
import { openEditCourseDialog } from '../edit-course-dialog/edit-course-dialog.component';

@Component({
    selector: 'home',
    standalone: true,
    imports: [MatTabGroup, MatTab, CoursesCardListComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
})
export class HomeComponent {
    #courses = signal<Course[]>([]);

    beginnerCourses = computed(() => this.#courses().filter((course) => course.category === 'BEGINNER'));
    advancedCourses = computed(() => this.#courses().filter((course) => course.category === 'ADVANCED'));

    // private coursesFService = inject(CoursesServiceWithFetch);
    private coursesService = inject(CoursesService);

    private matDialog = inject(MatDialog);

    constructor() {
        console.log('HomeComponent constructor');

        effect(() => {
            console.log('Beggining courses:', this.beginnerCourses());
            console.log('Advanced courses:', this.advancedCourses());
        });
        afterNextRender(() => {
            console.log('HomeComponent afterNextRender');
            this.loadFCourses().then(() => console.log(`Courses loaded:`, this.#courses()));
        });

        // afterRender(() => {
        //     console.log('HomeComponent afterRender');
        // });
    }

    ngOnInit() {
        console.log('HomeComponent ngOnInit');

        // this.loadFCourses().then(() => console.log(`Courses loaded:`, this.courses()));
    }

    async loadFCourses() {
        try {
            // const courses = await this.coursesFService.getAllCourses();
            const courses = await this.coursesService.getAllCourses();
            this.#courses.set(courses.sort(sortCoursesBySeqNo));
        } catch (error) {
            console.error(error);
        }
    }

    onCourseUpdated(updatedCourse: Course) {
        const courses = this.#courses();
        const updatedCourses = courses.map((course) => (course.id === updatedCourse.id ? updatedCourse : course));
        this.#courses.set(updatedCourses);
    }

    async onCourseDeleted(courseId: string) {
        try {
            await this.coursesService.deleteCourse(courseId);
            const courses = this.#courses();
            const updatedCourses = courses.filter((course) => course.id !== courseId);
            this.#courses.set(updatedCourses);
        } catch (error) {
            console.error('Error while deleting course');
        }
    }

    async addCourse() {
        const newCourse = await openEditCourseDialog(this.matDialog, {
            mode: 'create',
            title: 'Create New Course',
        });
        const courses = [...this.#courses(), newCourse];
        this.#courses.set(courses);
    }
}
