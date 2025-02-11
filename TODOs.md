PRIMARIES
- show the bottom navbar only in the workout app (/workouts or /exercises path)
- in workouts, enable to delete exercises (add 'remove from workout' option in the menu)
- refactor [workoutId] page, extract the dialog and extract the logic with custom hook


SECONDARIES
- add more information in exercise detail page (more images, videos, links, desription, duration (workout duration would be the sum), etc)
- enable the user can upload images and videos to the exercise detail page

Reconsider in the future:
- update a custom image
- use react redux for managing global state (ex: exercises)
- change the exercise - workout structure in database. Separate data base exercise and exercie inside workout. The first one has the basis that can be duplicate it and the second one is the specific for each user and workout.