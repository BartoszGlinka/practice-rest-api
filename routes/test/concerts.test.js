const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

const server = require('../../server');

const Concert = require('../../models/concert.model');

describe('concert / performer, genre, price , day/', () => {

    before(async () => {
        const testConcOne = new Concert({ _id: '5d9f1140f10a81216cfd4408', id : 4, performer:'anna-maria', genre: 'Pop', price: 28, day: 1, image: '/img/uploads/2f342s4fsdg.jpg' });
        await testConcOne.save();
      
        const testConcTwo = new Concert({_id: '5d9f1140f10a81216cfd4409', id : 5, performer:'mietek-szczesniak', genre: 'Pop', price: 29, day: 1, image: '/img/uploads/2f342s4fsdg.jpg' });
        await testConcTwo.save();
    });
      
    after(async () => {
     await Concert.deleteMany();
    });

    it('/ should return all concert with one performer', async () => {

        const res = await request(server).get('api/concerts/performer/:performer');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.not.be.null;
    });

      
});