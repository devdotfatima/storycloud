import profileImage from "../assets/images/profile_image.png";
// import StoryImage1 from "../assets/images/story_cover_1.jpg";
import StoryImage2 from "../assets/images/story_cover_2.jpg";
import StoryImage3 from "../assets/images/story_cover_3.jpg";
import StoryImage4 from "../assets/images/story_cover_4.jpg";
import StoryImage5 from "../assets/images/story_cover_5.jpg";
import StoryImage6 from "../assets/images/story_cover_6.jpg";
import StoryImage7 from "../assets/images/story_cover_7.jpg";
import StoryImage8 from "../assets/images/story_cover_8.jpg";
import AudioSample1 from "../assets/audios/librivox.mp3";

import { mockStoryT } from "./types";

export const profiles = [
  {
    userId: 1,
    userName: "John Doe",
    userHandle: "john_doe",
    userBio: "Traveler, photographer, and tech enthusiast.",
    postCount: 45,
    friendCount: 120,
    isFriend: true, // Assuming John is a friend
    profileImage:
      "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=3624&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    userId: 2,
    userName: "Jane Smith",
    userHandle: "jane_smith",
    userBio: "Baking addict and cat lover.",
    postCount: 30,
    friendCount: 85,
    isFriend: false, // Jane is not a friend
    profileImage:
      "https://images.unsplash.com/photo-1478061653917-455ba7f4a541?q=80&w=3500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    userId: 3,
    userName: "Carlos Ramirez",
    userHandle: "carlos_tech",
    userBio: "Tech guru, AI enthusiast, and gamer.",
    postCount: 67,
    friendCount: 200,
    isFriend: true, // Carlos is a friend
    profileImage:
      "https://images.unsplash.com/photo-1498757581981-8ddb3c0b9b07?q=80&w=3507&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    userId: 4,
    userName: "Emily Johnson",
    userHandle: "emily_j",
    userBio: "Bookworm, aspiring writer, and dreamer.",
    postCount: 12,
    friendCount: 45,
    isFriend: false, // Emily is not a friend
    profileImage:
      "https://images.unsplash.com/photo-1569241745136-733c38a5f4d3?q=80&w=2410&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    userId: 5,
    userName: "Michael Brown",
    userHandle: "mike_b",
    userBio: "Fitness coach and health enthusiast.",
    postCount: 98,
    friendCount: 150,
    isFriend: true, // Michael is a friend
    profileImage:
      "https://images.unsplash.com/photo-1688305069093-30ffa8bc1ce2?q=80&w=3723&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export const mockStories: mockStoryT[] = [
  {
    id: 1,
    title: "What is your favorite travel destination?",
    audioClip: AudioSample1,
    totalLikes: 145,
    totalComments: 52,
    totalShares: 37,
    transcript:
      "I have always loved visiting the mountains. The fresh air, the serene environment... I have always loved visiting the mountains. The fresh air, the serene environment...I have always loved visiting the mountains. The fresh air, the serene environment...I have always loved visiting the mountains. The fresh air, the serene environment...I have always loved visiting the mountains. The fresh air, the serene environment...I have always loved visiting the mountains. The fresh air, the serene environment...",
    comments: [
      {
        id: 1,
        user: "Emma",
        profileImage: profileImage,
        comment: "I love mountains too! Which one was your favorite?",
        createdAt: "3d ago",
      },
      {
        id: 2,
        user: "Liam",
        profileImage: profileImage,
        comment: "Great story, I felt like I was there!",
        createdAt: "1d ago",
      },
    ],
    storyImages: [StoryImage2, StoryImage3, StoryImage4, StoryImage5],
    isMyStory: true,
  },
  {
    id: 2,
    title: "How did you meet Dad?",
    audioClip: AudioSample1,
    totalLikes: 210,
    totalComments: 64,
    totalShares: 45,
    storyImages: [StoryImage8],
    transcript:
      "It was a rainy day in Paris. I was sipping coffee in a small café when he walked in...",
    comments: [
      {
        id: 1,
        user: "Olivia",
        profileImage: profileImage,
        comment: "This sounds like a movie!",
        createdAt: "1d ago",
      },
      {
        id: 2,
        user: "Noah",
        profileImage: profileImage,
        comment: "Such a romantic story!",
        createdAt: "1d ago",
      },
      {
        id: 3,
        user: "Ava",
        profileImage: profileImage,
        comment: "I love hearing stories like this!",
        createdAt: "1d ago",
      },
    ],
    isMyStory: false,
  },
  {
    isMyStory: true,
    id: 3,
    title: "Tell me about your high school experience!",
    audioClip: AudioSample1,
    totalLikes: 185,
    totalComments: 48,
    totalShares: 33,
    storyImages: [StoryImage6],
    transcript:
      "High school was such an adventure! From sports to friendships, every moment was special...",
    comments: [
      {
        id: 1,
        profileImage: profileImage,
        createdAt: "3d ago",
        user: "Sophia",
        comment: "High school memories are the best!",
      },
      {
        user: "James",
        id: 2,
        profileImage: profileImage,
        createdAt: "3d ago",
        comment: "Reminds me of my own high school days.",
      },
    ],
  },
  {
    id: 4,
    title: "Tell me about your childhood dreams!",
    audioClip: AudioSample1,
    totalLikes: 220,
    totalComments: 70,
    totalShares: 50,
    storyImages: [StoryImage7],
    isMyStory: true,

    transcript:
      "As a child, I dreamed of becoming an astronaut, exploring the stars, and discovering new worlds...",
    comments: [
      {
        user: "Mia",
        id: 1,
        profileImage: profileImage,
        createdAt: "3d ago",
        comment: "Wow, that’s amazing!",
      },
      {
        user: "Ethan",
        id: 2,
        profileImage: profileImage,
        createdAt: "3d ago",
        comment: "Who didn’t want to be an astronaut?",
      },
      {
        user: "Amelia",
        id: 3,
        profileImage: profileImage,
        createdAt: "3d ago",
        comment: "Such a beautiful dream!",
      },
    ],
  },
];

export const MY_STORY = false;
