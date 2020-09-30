const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server');

const Concert = require('../../models/concert.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;


describe('concert / performer, genre, price , day/', () => {

    before(async () => {
        const testConcOne = new Concert({ _id: '5d9f1140f10a81216cfd4410', id : 4, performer:'anna-maria', genre: 'Pop', price: 28, day: 1, image: '/img/uploads/2f342s4fsdg.jpg' });
        await testConcOne.save();
      
        const testConcTwo = new Concert({_id: '5d9f1140f10a81216cfd4411', id : 5, performer:'mietek-szczesniak', genre: 'Pop', price: 29, day: 1, image: '/img/uploads/2f342s4fsdg.jpg' });
        await testConcTwo.save();
    });
      
    it('/ should return all concert with one performer', async () => {

        const res = await request(server).get('/api/concerts/performer/anna-maria');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body).to.not.be.null;
        expect(res.body.length).to.be.equal(1);
    });

    it('/ should return all concert with one genre', async () => {

        const res = await request(server).get('/api/concerts/genre/Pop');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body).to.not.be.null;
        expect(res.body.length).to.be.equal(2);
    });

    it('/ should return all concert with one day', async () => {

        const res = await request(server).get('/api/concerts/day/1');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body).to.not.be.null;
        expect(res.body.length).to.be.equal(2);
    });

    it('/ should return all concert with right price range', async () => {

        const res = await request(server).get('/api/concerts/price/28/28');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body).to.not.be.null;
        expect(res.body.length).to.be.equal(1);
    });

    after(async () => {
        await Concert.deleteMany();
    });

      
});