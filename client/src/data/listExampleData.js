module.exports.data=[
  {
    "ID": 1,
    "Name": "First User",
    "Email": "example@example.com",
    "List": [
      {
        "ID": 1,
        "ListName": "Example Task List",
        "Task": [
          {
            "ID": 1,
            "Text": "Example task 1",
            "Status": "Incomplete"
          },
          {
            "ID": 2,
            "Text": "Example task 2",
            "Status": "Complete"
          },
          {
            "ID": 3,
            "Text": "Example task 3",
            "Status": "Incomplete"
          }
        ]
      },
      {
        "ID": 2,
        "ListName": "Second Example Task List",
        "Task": [
          {
            "ID": 4,
            "Text": "Second example task 1",
            "Status": "Complete"
          },
          {
            "ID": 5,
            "Text": "Second example task 2",
            "Status": "Incomplete"
          },
          {
            "ID": 6,
            "Text": "Second example task 3",
            "Status": "Complete"
          }
        ]
      },
      {
        "ID": 3,
        "ListName": "Third Example Task List",
        "Task": [
          {
            "ID": 7,
            "Text": "Third example task 1",
            "Status": "Incomplete"
          },
          {
            "ID": 8,
            "Text": "Third example task 2",
            "Status": "Complete"
          },
          {
            "ID": 9,
            "Text": "Third example task 3",
            "Status": "Incomplete"
          }
        ]
      }
    ],
    "Friends": [
      {
        "ID": 1,
        "List": {
          "ID": 2,
          "Name": "Friend's Example List",
          "Email": "friend@example.com",
          "List": [
            {
              "ID": 10,
              "ListName": "Friend's Example Task List",
              "Task": [
                {
                  "ID": 10,
                  "Text": "Friend's example task 1",
                  "Status": "Complete"
                },
                {
                  "ID": 11,
                  "Text": "Friend's example task 2",
                  "Status": "Incomplete"
                },
                {
                  "ID": 12,
                  "Text": "Friend's example task 3",
                  "Status": "Complete"
                }
              ]
            }
          ]
        }
      }
    ]
  },
  {
    "ID": 2,
    "Name": "Second User",
    "Email": "another@example.com",
    "List": [
      {
        "ID": 4,
        "ListName": "Another Task List",
        "Task": [
          {
            "ID": 13,
            "Text": "Another task 1",
            "Status": "Incomplete"
          },
          {
            "ID": 14,
            "Text": "Another task 2",
            "Status": "Complete"
          },
          {
            "ID": 15,
            "Text": "Another task 3",
            "Status": "Incomplete"
          }
        ]
      },
      {
        "ID": 5,
        "ListName": "Second Another Task List",
        "Task": [
          {
            "ID": 16,
              "Text": "Second another task 1",
              "Status": "Complete"
          },
          {
              "ID": 17,
              "Text": "Second another task 2",
              "Status": "Incomplete"
          },
          {
              "ID": 18,
              "Text": "Second another task 3",
              "Status": "Complete"
          }
        ] 
      },
      {
          "ID": 6,
          "ListName": "Third Another Task List",
          "Task": [
              {
                  "ID": 19,
                  "Text": "Third another task 1",
                  "Status": "Incomplete"
              },
              {
                  "ID": 20,
                  "Text": "Third another task 2",
                  "Status": "Complete"
              },
              {
                  "ID": 21,
                  "Text": "Third another task 3",
                  "Status": "Incomplete"
              }
          ]
      }
      ],
      "Friends": [
          {
              "ID": 2,
              "List": {
                  "ID": 3,
                  "Name": "Another Friend's Example List",
                                          "Email": "second@example.com",
                  "List": [
                      {
                          "ID": 11,
                          "ListName": "Another Friend's Example Task List",
                          "Task": [
                              {
                                  "ID": 22,
                                  "Text": "Another Friend's example task 1",
                                  "Status": "Complete"
                              },
                              {
                                  "ID": 23,
                                  "Text": "Another Friend's example task 2",
                                  "Status": "Incomplete"
                              },
                              {
                                  "ID": 24,
                                  "Text": "Another Friend's example task 3",
                                  "Status": "Complete"
                              }
                          ]
                      }
                  ]
              }
          }
      ]
  }
  ]



