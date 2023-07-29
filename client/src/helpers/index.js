import toast from 'react-hot-toast';

const handleBlogShare = (blogID) => {
  // Get the URL for the specific blog 
  const blogURL = window.location.origin + `/blogs/${blogID}`;
  // Attempt to copy the blog URL to the clipboard
  navigator.clipboard.writeText(blogURL)
    .then(() => {
      toast.success('Link copied to clipboard!');
    })
    .catch((error) => {
      toast.error('Failed to copy: ' + error);
    })
}

const handleDate = (date) => {
  date = new Date(date)
  const options = { month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

const handleContent = (content) => {
  let newContent = content.slice(0, 200)
  if (content.length > 200) {
    newContent + "..."
  }
  return newContent
}

export { handleBlogShare, handleDate, handleContent }