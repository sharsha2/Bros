//Set up public array of global variables

module.exports =
{
    'db': 'mongodb+srv://sharsha2:Harsha@9699@brosmanager.ud2ws.mongodb.net/bros',
    ids: {
        'google': {
            clientID: '574961970497-mpsfq6u87crhh3q7kocl9ddonkvlh3in.apps.googleusercontent.com',
            clientSecret: 'kw9Qb1lvFXxbSN1-08-8gUWQ',
            callbackURL: 'http://localhost:3000/google/callback',
            callbackURL: 'https://bros-shopy.herokuapp.com/google/callback'
        },
        'facebook': {
            clientID: '122228702843051',
            clientSecret: '5fbd67eb46c3799b336b2c0156fa8aec',
            callbackURL: 'http://localhost:3000/facebook/callback',


        },
    }
}