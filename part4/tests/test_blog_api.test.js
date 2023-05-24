const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})

    let blogObj = new Blog(helper.initialBlogs[0])
    await blogObj.save()

    blogObj = new Blog(helper.initialBlogs[1])
    await blogObj.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('every blogs have id', async () => {
    const response = await api.get('/api/blogs')

    response.body.forEach(item => {
        expect(item.id).toBeDefined()
    })
})

test('can add a valid blog', async () => {
    const newBlog = {
        title: "Testing with Jest",
        author: "Mika Yamada",
        url: "https://testingwithjest.com",
        likes: 10,
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
    
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(item => item.title)
    expect(titles).toContain("Testing with Jest")

}, 10000)

test('automatically added 0 likes', async () => {
    const newBlog = {
        title: "React for 5 years old",
        author: "Delonix Ann",
        url: "https://reacttips.com",
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
    
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const addedBlog = blogsAtEnd.find(item => item.title === "React for 5 years old")
    expect(addedBlog.likes).toEqual(0)
    
}, 10000)

test('return 400 code if no title', async () => {
    const newBlog = {
        author: "Delonix Ann",
        url: "https://reacttips.com",
        likes: 1
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
    
}, 10000)

test('return 400 code if no url', async () => {
    const newBlog = {
        title: "Testing React for Dummies",
        author: "Andy Malarangeng",
        likes: 3
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
    
}, 10000)

test('a note can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(202)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)

    const titles = blogsAtEnd.map(item => item.title)
    expect(titles).not.toContain(blogToDelete.title)
})

test('a note can be updated', async ()=> {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const contentUpdated = {
        title: "Learning React Tips",
        author: "Edsger W. Dijkstra",
        url: "https://facebook.com",
        likes: 10,
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(contentUpdated)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)

    const titles = blogsAtEnd.map(item => item.title)
    expect(titles).toContain(contentUpdated.title)

})

afterAll(async () => {
  await mongoose.connection.close()
})