const request = require('supertest');
require('dotenv').config({path: './.env.test'});
const {Course} = require('../../model/course');
let server;

describe('/api/courses', () => {
    beforeEach(() => {
        server = require('../../index'); 
    });
    
    afterEach(async () => {
        await Course.deleteMany({});
        await server.close();
    }); 

    describe('GET /', () => {
        it('Should return all courses ', async () => {
            const payload = [
                {name: "course1"},
                {name: "course2"}
            ];
            await Course.collection.insertMany(payload);
            
            const res = await request(server).get('/api/courses');
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
            expect(res.body.some(c => c.name === 'course1')).toBeTruthy();
            expect(res.body.some(c => c.name === 'course2')).toBeTruthy();
        })
    });

    describe('GET /:id', () => {
        it('Should return specific course given valid id', async () => {
            const course = new Course({ name:'course1' });
            await course.save();

            const res = await request(server).get('/api/courses/',course._id);
            
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('name',course.name);
        });

        it('Should return 404 of invalid id', async () => {
            const res = await request(server).get('/api/courses/1');
            expect(res.status).toBe(404);
        });
    });
})