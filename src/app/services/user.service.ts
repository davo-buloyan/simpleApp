import { Injectable } from "@angular/core";

import { IUser } from "@app/models/users.model";
import { BehaviorSubject, distinctUntilChanged, map, take, timer } from "rxjs";

export enum CallState {
    Init = 'INIT',
    Loading = 'LOADING',
    Loaded = 'LOADED',
    Error = 'ERROR'
}

interface IUsersState {
    users: IUser[];
    callState: CallState;
}

const initialState: IUsersState = {
    users: [],
    callState: CallState.Init
};

Injectable({
    providedIn: 'root'
})
export class UserService {

    private readonly usersState = new BehaviorSubject<IUsersState>(initialState);

    readonly users$ = this.usersState.asObservable().pipe(
        map(({ users }) => users), 
        distinctUntilChanged()
        );
    
    readonly callState$ = this.usersState.asObservable().pipe(
        map(({ callState }) => callState), 
        distinctUntilChanged()
    );

    delateUser(id: number) {
        // previous state
        const state = this.usersState.getValue();

        const filtered = state.users.filter((user) => user.id != id);

        this.usersState.next({ ...state, users: filtered });
    }

    loadUsersWithSuccess() {
        this.usersState.next({
            ...this.usersState.getValue(), 
            callState: CallState.Loading, 
        });
        
        timer(2000, 2000)
            .pipe(take(1))
            .subscribe(() => {
                this.usersState.next({ 
                    ...this.usersState.getValue(),
                    callState: CallState.Loaded, 
                    users: getUsers()
                });
            });
    }

    loadUsersWithFailure() {
        timer(2000, 2000)
            .pipe(take(1))
            .subscribe(() => {
                this.usersState.next({ 
                    callState: CallState.Error,
                    users: [] 
                });

            });
    }


}


function getUsers(): IUser[] {
    return [
        {
            id: 1,
            username: 'Davit',
            email: 'davobul@gmail.com',
            age: 31,
            company: 'company'
        },
        {
            id: 2,
            username: 'Jhon',
            email: 'jhon@gmail.com',
            age: 31,
            company: 'Apple'
        },
        {
            id: 3,
            username: 'Bill',
            email: 'Bill@gmail.com',
            age: 34,
            company: 'Microsoft'
        },
        {
            id: 4,
            username: 'Tony',
            email: 'tony@gmail.com',
            age: 39,
            company: 'Antony'
        },
        {
            id: 5,
            username: 'Justin',
            email: 'justin@gmail.com',
            age: 22,
            company: 'no company'
        },
    
        {
            id: 6,
            username: 'Mary',
            email: 'Mary@gmail.com',
            age: 25,
            company: 'no company'
        },
        {
            id: 7,
            username: 'Marta',
            email: 'Marta@gmail.com',
            age: 33,
            company: 'Faberlic'
        },
    
        {
            id: 8,
            username: 'Julya',
            email: 'julya@gmail.com',
            age: 29,
            company: 'no company'
        },
        {
            id: 9,
            username: 'Sara',
            email: 'sara@gmail.com',
            age: 27,
            company: 'Cool company'
        },
    ];
}
 