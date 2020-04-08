import { sentilize } from './sentilizer';

export const routes = [
    {
        method: 'GET',
        path: '/',
        handler: function (request,h){
            return 'this is home page';
        }
    },
    {
        method: 'POST',
        path: '/sentilize',
        handler: function(request,h){
            let payload = request.payload;
            if(typeof(payload) === 'string'){
                payload = JSON.parse(payload);
            }
            return sentilize(payload.sentence);
        }
    },
];