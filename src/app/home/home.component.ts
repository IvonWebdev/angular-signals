import { afterNextRender, afterRender, Component, computed, effect, inject, Injector, signal } from '@angular/core';
import { CoursesServiceWithFetch } from '../services/courses-fetch.service';
import { CoursesService } from '../services/courses.service';
import { Course, sortCoursesBySeqNo } from '../models/course.model';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { CoursesCardListComponent } from '../courses-card-list/courses-card-list.component';
import { MatDialog } from '@angular/material/dialog';
import { MessagesService } from '../messages/messages.service';
import { catchError, from, throwError } from 'rxjs';
import { toObservable, toSignal, outputToObservable, outputFromObservable } from '@angular/core/rxjs-interop';

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
}
