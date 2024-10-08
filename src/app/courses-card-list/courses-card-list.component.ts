import { Component, inject, input, output, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Course } from '../models/course.model';
import { MatDialog } from '@angular/material/dialog';
import { openEditCourseDialog } from '../edit-course-dialog/edit-course-dialog.component';

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

    onCourseUpdate = output<Course>();

    onCourseDelete = output<string>();

    dialog = inject(MatDialog);

    async onEditCourse(course: Course) {
        const newCourse = await openEditCourseDialog(this.dialog, {
            mode: 'update',
            title: 'Update Existing Course',
            course,
        });

        console.log(`Course edited:`, newCourse);
        if (newCourse) this.onCourseUpdate.emit(newCourse);
    }

    onDeleteCourse(course: Course) {
        this.onCourseDelete.emit(course.id);
    }
    // @output() courseChanged = signal<Course>();

    // constructor(private dialog: MatDialog) {
    //     console.log('CoursesCardListComponent constructor');
    // }

    // openCourseDialog(course: Course) {
    //     this.dialog.open(CourseDialogComponent, { data: course });
    // }
}
