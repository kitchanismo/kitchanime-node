const Event = use('Event')

Event.on('new::user', 'User.registered')

Event.onAny('User.something')
