import AudioSample1 from "../assets/audios/librivox.mp3";

import { StoryAnswerT } from "./types";

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

export const mockStories: StoryAnswerT[] = [
  {
    story_id: "1",
    story_title: "What is your favorite travel destination?",
    formatted_story_title: "What is your favorite travel destination?",
    story_audio: AudioSample1,

    story_transcript:
      "I have always loved visiting the mountains. The fresh air, the serene environment... I have always loved visiting the mountains. The fresh air, the serene environment...I have always loved visiting the mountains. The fresh air, the serene environment...I have always loved visiting the mountains. The fresh air, the serene environment...I have always loved visiting the mountains. The fresh air, the serene environment...I have always loved visiting the mountains. The fresh air, the serene environment...",

    story_images: {
      additionalProp1: "assets/images/story_cover_1.jpg",
      additionalProp2: "assets/images/story_cover_5.jpg",
    },
    user_id: "1",
    is_published: true,
    audience: "all_friends",
  },
  {
    story_id: "2",
    story_title: "How did you meet Dad?",
    formatted_story_title: "How did you meet Dad?",
    story_audio: AudioSample1,

    story_images: { additionalProp1: "assets/images/story_cover_8.jpg" },
    story_transcript:
      "It was a rainy day in Paris. I was sipping coffee in a small café when he walked in...",

    is_published: false,
    audience: "all_friends",
    user_id: "1",
  },
];

export const MY_STORY = false;
