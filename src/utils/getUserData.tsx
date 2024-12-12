import { useEffect, useState } from "react";
import axios from "axios";

interface userProps {
  _id: string;
  name: string;
  email: string;
  components: ComponentProps[];
}

interface ComponentProps {
  _id: string;
  codeSnippet?: string;
  componentCode?: string;
  title?: string;
  description?: string;
  componentPath?: string;
  componentsUses?: string;
  image?: string;
  video?: string;
  owner?: userProps;
  comments?: CommentProps[];
}

interface CommentProps {
  _id: string;
  feedback: string;
  user: userProps;
}

const useUserData = () => {
  const [user, setUser] = useState<userProps | undefined>();
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string>("");
  const [loading, setLoading] = useState(true); // To handle loading state
  const [error, setError] = useState<string | null>(null); // To handle error state

  const fetchUser = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("/api/user/me");

      if (response.data.success) {
        setIsUserSignedIn(true);
        setCurrentUserId(response.data.user._id);
        setUser(response.data.user);
      } else {
        setIsUserSignedIn(false);
      }
    } catch (err) {
      console.error("Error fetching user data:", err);
      setError("Failed to fetch user data.");
      setIsUserSignedIn(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return { user, isUserSignedIn, currentUserId, loading, error };
};

export default useUserData;
