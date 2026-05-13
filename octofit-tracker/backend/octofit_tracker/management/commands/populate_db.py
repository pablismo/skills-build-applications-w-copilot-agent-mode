from django.core.management.base import BaseCommand
from django.conf import settings
from django.db import connection

from bson import ObjectId

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        db = connection.cursor().db_conn.client['octofit_db']
        # Limpiar colecciones
        db.users.delete_many({})
        db.teams.delete_many({})
        db.activities.delete_many({})
        db.leaderboard.delete_many({})
        db.workouts.delete_many({})

        # Equipos
        marvel_id = ObjectId()
        dc_id = ObjectId()
        teams = [
            {'_id': marvel_id, 'name': 'Marvel'},
            {'_id': dc_id, 'name': 'DC'}
        ]
        db.teams.insert_many(teams)

        # Usuarios
        users = [
            {'_id': ObjectId(), 'name': 'Spider-Man', 'email': 'spiderman@marvel.com', 'team_id': marvel_id},
            {'_id': ObjectId(), 'name': 'Iron Man', 'email': 'ironman@marvel.com', 'team_id': marvel_id},
            {'_id': ObjectId(), 'name': 'Wonder Woman', 'email': 'wonderwoman@dc.com', 'team_id': dc_id},
            {'_id': ObjectId(), 'name': 'Batman', 'email': 'batman@dc.com', 'team_id': dc_id},
        ]
        db.users.insert_many(users)
        db.users.create_index('email', unique=True)

        # Actividades
        activities = [
            {'_id': ObjectId(), 'user_email': 'spiderman@marvel.com', 'type': 'run', 'distance': 5},
            {'_id': ObjectId(), 'user_email': 'ironman@marvel.com', 'type': 'cycle', 'distance': 20},
            {'_id': ObjectId(), 'user_email': 'wonderwoman@dc.com', 'type': 'swim', 'distance': 2},
            {'_id': ObjectId(), 'user_email': 'batman@dc.com', 'type': 'run', 'distance': 10},
        ]
        db.activities.insert_many(activities)

        # Leaderboard
        leaderboard = [
            {'_id': ObjectId(), 'team': 'Marvel', 'points': 100},
            {'_id': ObjectId(), 'team': 'DC', 'points': 90},
        ]
        db.leaderboard.insert_many(leaderboard)

        # Workouts
        workouts = [
            {'_id': ObjectId(), 'user_email': 'spiderman@marvel.com', 'workout': 'Push-ups', 'reps': 50},
            {'_id': ObjectId(), 'user_email': 'wonderwoman@dc.com', 'workout': 'Sit-ups', 'reps': 40},
        ]
        db.workouts.insert_many(workouts)

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data.'))
