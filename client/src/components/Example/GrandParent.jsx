import React from 'react'

const data = {
    "List": [
        {
            "ID": 1,
            "ListName": "Example Task List",
            "Task": [
                {
                    "ID": 1,
                    "Text": "Example task 1"
                },
                {
                    "ID": 2,
                    "Text": "Example task 2"
                },
                {
                    "ID": 3,
                    "Text": "Example task 3"
                }
            ]
        },
        {
            "ID": 2,
            "ListName": "Second Example Task List",
            "Task": [
                {
                    "ID": 4,
                    "Text": "Second example task 1"
                },
                {
                    "ID": 5,
                    "Text": "Second example task 2"
                },
                {
                    "ID": 6,
                    "Text": "Second example task 3"
                }
            ]
        },
        {
            "ID": 3,
            "ListName": "Third Example Task List",
            "Task": [
                {
                    "ID": 7,
                    "Text": "Third example task 1"
                },
                {
                    "ID": 8,
                    "Text": "Third example task 2"
                },
                {
                    "ID": 9,
                    "Text": "Third example task 3"
                }
            ]
        }
    ]
}

export default function GrandParent() {


    return (
        <div>GrandParent</div>
    )
}
