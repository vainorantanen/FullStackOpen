import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Blog = ({ blog }) => {

  return (
      <tr>
        <td>
      <Link to={`/blogs/${blog.id}`}>{blog.title} </Link>
      </td>
      <td>
      {blog.author}
      </td>
      </tr>  
  );
};

Blog.propTypes = {
  like: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  canRemove: PropTypes.bool,
  blog: PropTypes.shape({
    title: PropTypes.string,
    author: PropTypes.string,
    url: PropTypes.string,
    likes: PropTypes.number,
  }),
};

export default Blog;