import BlogCard from "./BlogCard";

function BlogList({ blogs, title }) {
  return (
    <section className="max-w-7xl mx-auto px-6 py-10">

      {title && (
        <h2 className="text-3xl font-bold mb-6">
          {title}
        </h2>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {blogs.map((blog)=>(
          <BlogCard
            key={blog._id}
            blog={blog}
          />
        ))}

      </div>

    </section>
  );
}

export default BlogList;