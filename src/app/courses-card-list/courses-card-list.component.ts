import { Component, inject, input, output, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Course } from '../models/course.model';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'courses-card-list',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './courses-card-list.component.html',
    styleUrl: './courses-card-list.component.scss',
})
export class CoursesCardListComponent {
    // @Input() courses: Course[] = [];
    courses = input.required<Course[]>();

    // @output() courseChanged = signal<Course>();

    // constructor(private dialog: MatDialog) {
    //     console.log('CoursesCardListComponent constructor');
    // }

    // openCourseDialog(course: Course) {
    //     this.dialog.open(CourseDialogComponent, { data: course });
    // }
}
