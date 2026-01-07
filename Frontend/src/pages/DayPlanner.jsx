import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { FaYoutube, FaExternalLinkAlt } from "react-icons/fa";

export default function DayPlanner() {
  const [plan, setPlan] = useState("");
  const [loading, setLoading] = useState(false);
  const [emotion, setEmotion] = useState("neutral");
  const [timeSlots, setTimeSlots] = useState([]);
  const [planTitle, setPlanTitle] = useState("");
  const [planFocus, setPlanFocus] = useState("");
  const [error, setError] = useState(null);
  const [kannadaSongs, setKannadaSongs] = useState([]);
  const [currentTimeIST, setCurrentTimeIST] = useState("");
  
  const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
  
  const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${apiKey}`;

  // Get current IST time in 12-hour format
  const getCurrentISTTime = useCallback(() => {
    const now = new Date();
    const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);
    const istTime = new Date(utcTime + (5.5 * 60 * 60000));
    
    let hours = istTime.getHours();
    const minutes = istTime.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    
    return `${hours}:${minutes} ${ampm}`;
  }, []);

  // Calculate next 30-minute interval from current time
  const getNextTimeSlot = useCallback(() => {
    const now = new Date();
    const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);
    const istTime = new Date(utcTime + (5.5 * 60 * 60000));
    
    let hours = istTime.getHours();
    let minutes = istTime.getMinutes();
    
    if (minutes > 30) {
      hours += 1;
      minutes = 0;
    } else if (minutes > 0 && minutes <= 30) {
      minutes = 30;
    }
    
    if (hours >= 24) hours -= 24;
    
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  }, []);

  // Create YouTube search URL for a song
  const getYouTubeUrl = useCallback((songTitle, artist) => {
    const searchQuery = `${songTitle} ${artist} Kannada song`.replace(/\s+/g, '+');
    return `https://www.youtube.com/results?search_query=${searchQuery}`;
  }, []);

  // Get default Kannada songs based on emotion
  const getDefaultKannadaSongs = useCallback((currentEmotion) => {
    const emotionSongs = {
      joy: [
        { title: "Baare Baare", artist: "S. P. Balasubrahmanyam", youtubeUrl: getYouTubeUrl("Baare Baare", "S. P. Balasubrahmanyam") },
        { title: "Jogada Siri Belakinalli", artist: "P. Kalinga Rao", youtubeUrl: getYouTubeUrl("Jogada Siri Belakinalli", "P. Kalinga Rao") },
        { title: "Huttidare Kannada", artist: "C. Ashwath", youtubeUrl: getYouTubeUrl("Huttidare Kannada", "C. Ashwath") },
        { title: "Kanasugala", artist: "Ravindra Soragavi", youtubeUrl: getYouTubeUrl("Kanasugala", "Ravindra Soragavi") }
      ],
      sad: [
        { title: "Kanne Kanne", artist: "From movie 'Kavacha'", youtubeUrl: getYouTubeUrl("Kanne Kanne", "Kavacha movie") },
        { title: "Belaku Idu", artist: "From movie 'Geetha'", youtubeUrl: getYouTubeUrl("Belaku Idu", "Geetha movie") },
        { title: "Male Nintu", artist: "Rajkumar", youtubeUrl: getYouTubeUrl("Male Nintu", "Rajkumar") },
        { title: "Naguva Nayana", artist: "S. P. Balasubrahmanyam", youtubeUrl: getYouTubeUrl("Naguva Nayana", "S. P. Balasubrahmanyam") }
      ],
      calm: [
        { title: "Male Nintu", artist: "Rajkumar", youtubeUrl: getYouTubeUrl("Male Nintu", "Rajkumar") },
        { title: "Kanasugala", artist: "Ravindra Soragavi", youtubeUrl: getYouTubeUrl("Kanasugala", "Ravindra Soragavi") },
        { title: "Onde Ondu Saari", artist: "C. Ashwath", youtubeUrl: getYouTubeUrl("Onde Ondu Saari", "C. Ashwath") },
        { title: "Bhaavageethe", artist: "Various Artists", youtubeUrl: getYouTubeUrl("Kannada Bhaavageethe", "Various Artists") }
      ],
      neutral: [
        { title: "Huttidare Kannada", artist: "C. Ashwath", youtubeUrl: getYouTubeUrl("Huttidare Kannada", "C. Ashwath") },
        { title: "Baare Baare", artist: "S. P. Balasubrahmanyam", youtubeUrl: getYouTubeUrl("Baare Baare", "S. P. Balasubrahmanyam") },
        { title: "Jogada Siri Belakinalli", artist: "P. Kalinga Rao", youtubeUrl: getYouTubeUrl("Jogada Siri Belakinalli", "P. Kalinga Rao") },
        { title: "Kanasugala", artist: "Ravindra Soragavi", youtubeUrl: getYouTubeUrl("Kanasugala", "Ravindra Soragavi") }
      ],
      fear: [
        { title: "Shanti Nilaya", artist: "Various Artists", youtubeUrl: getYouTubeUrl("Shanti Nilaya Kannada", "Various Artists") },
        { title: "Om Sahana Vavatu", artist: "Traditional", youtubeUrl: getYouTubeUrl("Om Sahana Vavatu Kannada", "Traditional") },
        { title: "Gayatri Mantra", artist: "Various Artists", youtubeUrl: getYouTubeUrl("Gayatri Mantra Kannada", "Various Artists") },
        { title: "Male Nintu", artist: "Rajkumar", youtubeUrl: getYouTubeUrl("Male Nintu", "Rajkumar") }
      ],
      anxious: [
        { title: "Om Sahana Vavatu", artist: "Traditional", youtubeUrl: getYouTubeUrl("Om Sahana Vavatu Kannada", "Traditional") },
        { title: "Shanti Mantra", artist: "Various Artists", youtubeUrl: getYouTubeUrl("Shanti Mantra Kannada", "Various Artists") },
        { title: "Gayatri Mantra", artist: "Various Artists", youtubeUrl: getYouTubeUrl("Gayatri Mantra Kannada", "Various Artists") },
        { title: "Male Nintu", artist: "Rajkumar", youtubeUrl: getYouTubeUrl("Male Nintu", "Rajkumar") }
      ]
    };
    
    return emotionSongs[currentEmotion.toLowerCase()] || emotionSongs.neutral;
  }, [getYouTubeUrl]);

  // Helper function to check if time slot should be included
  const shouldIncludeTimeSlot = useCallback((timeString) => {
    const currentIST = getCurrentISTTime();
    
    const extractTime = (str) => {
      const match = str.match(/(\d{1,2}):(\d{2})\s?([APap][Mm])?/);
      if (!match) return { hour: 0, minute: 0, ampm: 'AM' };
      
      let hour = parseInt(match[1]);
      const minute = parseInt(match[2]);
      const ampm = match[3] ? match[3].toUpperCase() : 'AM';
      
      if (ampm === 'PM' && hour !== 12) hour += 12;
      if (ampm === 'AM' && hour === 12) hour = 0;
      
      return { hour, minute, ampm };
    };
    
    const slotTime = extractTime(timeString);
    const currentTime = extractTime(currentIST);
    
    const slotMinutes = slotTime.hour * 60 + slotTime.minute;
    const currentMinutes = currentTime.hour * 60 + currentTime.minute;
    
    return slotMinutes >= currentMinutes;
  }, [getCurrentISTTime]);

  // Create default time slots starting from given time
  const createDefaultTimeSlots = useCallback((startTime) => {
    const slots = [];
    let currentTime = startTime;
    
    const activities = [
      { activity: "Plan Your Day", type: "work", desc: "Review your tasks and set priorities" },
      { activity: "Deep Work Session", type: "work", desc: "Focus on important tasks without distractions" },
      { activity: "Short Break", type: "break", desc: "Stretch and hydrate" },
      { activity: "Creative Work", type: "work", desc: "Work on creative projects or learning" },
      { activity: "Lunch Break", type: "food", desc: "Enjoy a nutritious meal away from work" },
      { activity: "Afternoon Tasks", type: "work", desc: "Handle emails and administrative work" },
      { activity: "Evening Walk", type: "exercise", desc: "Get some fresh air and light exercise" },
      { activity: "Dinner", type: "food", desc: "Light, healthy dinner" },
      { activity: "Relaxation Time", type: "break", desc: "Read, meditate, or enjoy a hobby" },
      { activity: "Wind Down", type: "rest", desc: "Prepare for restful sleep" }
    ];
    
    const incrementTime = (timeStr) => {
      const match = timeStr.match(/(\d{1,2}):(\d{2})\s?([APap][Mm])/);
      if (!match) return timeStr;
      
      let hour = parseInt(match[1]);
      let minute = parseInt(match[2]);
      let ampm = match[3].toUpperCase();
      
      minute += 30;
      if (minute >= 60) {
        hour += Math.floor(minute / 60);
        minute = minute % 60;
      }
      
      if (hour >= 12) {
        if (hour > 12) hour -= 12;
        if (ampm === 'AM' && hour === 12) ampm = 'PM';
        else if (ampm === 'PM' && hour === 12) ampm = 'AM';
      }
      
      const formattedMinute = minute.toString().padStart(2, '0');
      return `${hour}:${formattedMinute} ${ampm}`;
    };
    
    for (let i = 0; i < Math.min(8, activities.length); i++) {
      const endTime = incrementTime(currentTime);
      const timeRange = `${currentTime} - ${endTime}`;
      
      slots.push({
        time: timeRange,
        mainActivity: activities[i].activity,
        description: activities[i].desc,
        type: activities[i].type
      });
      
      currentTime = incrementTime(endTime);
    }
    
    return slots;
  }, []);

  // Parse plan response
  const parsePlanResponse = useCallback((text) => {
    console.log("Parsing plan response...");
    
    if (!text || typeof text !== 'string') {
      console.error("Invalid response text");
      return;
    }
    
    // Extract title
    let title = "Your Day Plan";
    const titleMatch = text.match(/\*\*([^*]+)\*\*/);
    if (titleMatch && titleMatch[1]) {
      title = titleMatch[1].trim();
    }
    
    // Extract focus
    let focus = "Balanced daily activities";
    const focusMatch = text.match(/Focus[:\\-]?\s*(.+?)(?=\n|$)/i) || 
                      text.match(/Today['']?s Focus[:\\-]?\s*(.+?)(?=\n|$)/i);
    if (focusMatch && focusMatch[1]) {
      focus = focusMatch[1].trim();
    }
    
    // Extract Kannada songs with enhanced parsing
    const songs = [];
    
    // Try multiple patterns to extract songs
    const songPatterns = [
      /["']([^"']+?)["']\s*(?:by|from|[-–])\s*(.+?)(?=\n|\.|$)/gi,
      /(?:Song|Track|Music):?\s*["']([^"']+?)["']\s*(?:by|from)\s*(.+?)(?=\n|\.|$)/gi,
      /(\d+\.)\s*["']([^"']+?)["']\s*(?:by|from|[-–])\s*(.+?)(?=\n|\.|$)/gi,
      /["']([^"']+?)["']\s*(?:\(([^)]+)\))?/gi
    ];
    
    for (const pattern of songPatterns) {
      let match;
      while ((match = pattern.exec(text)) !== null) {
        let songTitle, artist;
        
        if (match.length >= 3) {
          songTitle = match[1] || match[2];
          artist = match[2] || match[3] || "Various Artists";
        } else if (match.length === 2) {
          songTitle = match[1];
          artist = "Various Artists";
        }
        
        if (songTitle && (text.toLowerCase().includes('kannada') || 
            songTitle.toLowerCase().includes('kannada') || 
            artist.toLowerCase().includes('kannada'))) {
          
          // Clean up title and artist
          songTitle = songTitle.trim().replace(/^["']|["']$/g, '');
          artist = artist.trim().replace(/^["']|["']$/g, '');
          
          // Check if song already exists
          if (!songs.some(s => s.title === songTitle && s.artist === artist)) {
            songs.push({
              title: songTitle,
              artist: artist,
              youtubeUrl: getYouTubeUrl(songTitle, artist)
            });
          }
        }
      }
    }
    
    // If no songs found, add default Kannada songs
    if (songs.length === 0) {
      const defaultSongs = getDefaultKannadaSongs(emotion);
      setKannadaSongs(defaultSongs);
    } else {
      setKannadaSongs(songs.slice(0, 4)); // Limit to 4 songs
    }
    
    setPlanTitle(title);
    setPlanFocus(focus);
    
    // Parse time slots
    const lines = text.split('\n');
    const slots = [];
    
    lines.forEach((line, index) => {
      line = line.trim();
      if (!line) return;
      
      // Match time slots - FIXED regex escape characters
      const timeRegex = /(\d{1,2}:\d{2}\s?[APap][Mm]?\s?[-–]\s?\d{1,2}:\d{2}\s?[APap][Mm]?|\d{1,2}:\d{2}\s?[APap][Mm]?)(?:\s*[:-]|\s+)(.+)/i;
      const match = line.match(timeRegex);
      
      if (match) {
        const time = match[1].trim();
        let activity = match[2].trim();
        
        // Clean activity text - FIXED escape characters
        activity = activity.replace(/^\s*(\[|\]|\(|\))\s*/, '').replace(/\s*(\[|\]|\(|\))\s*$/, '');
        activity = activity.replace(/\*\*/g, '').trim();
        
        if (shouldIncludeTimeSlot(time)) {
          let type = "general";
          const activityLower = activity.toLowerCase();
          
          if (activityLower.includes('wake') || activityLower.includes('sleep') || 
              activityLower.includes('bed') || activityLower.includes('wind down') ||
              activityLower.includes('rest') || activityLower.includes('awaken')) {
            type = "rest";
          } else if (activityLower.includes('breakfast') || activityLower.includes('lunch') || 
                    activityLower.includes('dinner') || activityLower.includes('eat') || 
                    activityLower.includes('meal') || activityLower.includes('nourish') ||
                    activityLower.includes('drink') || activityLower.includes('hydrate')) {
            type = "food";
          } else if (activityLower.includes('work') || activityLower.includes('task') || 
                    activityLower.includes('study') || activityLower.includes('focus') || 
                    activityLower.includes('project') || activityLower.includes('meeting') ||
                    activityLower.includes('prepare') || activityLower.includes('intention')) {
            type = "work";
          } else if (activityLower.includes('exercise') || activityLower.includes('walk') || 
                    activityLower.includes('yoga') || activityLower.includes('stretch') || 
                    activityLower.includes('move') || activityLower.includes('gym') ||
                    activityLower.includes('movement')) {
            type = "exercise";
          } else if (activityLower.includes('break') || activityLower.includes('relax') || 
                    activityLower.includes('meditate') || activityLower.includes('free time') || 
                    activityLower.includes('hobby') || activityLower.includes('read') ||
                    activityLower.includes('music') || activityLower.includes('creative')) {
            type = "break";
          }
          
          const activityParts = activity.split(/[.:-]/);
          const mainActivity = activityParts[0].trim();
          const description = activityParts.slice(1).join('.').trim();
          
          slots.push({
            time,
            mainActivity: mainActivity || activity,
            description: description || "",
            type
          });
        }
      }
    });
    
    // If no slots found, create default ones
    if (slots.length === 0) {
      const defaultSlots = createDefaultTimeSlots(getNextTimeSlot());
      setTimeSlots(defaultSlots);
    } else {
      const filteredSlots = slots.filter(slot => shouldIncludeTimeSlot(slot.time));
      setTimeSlots(filteredSlots.length > 0 ? filteredSlots : slots.slice(0, 5));
    }
  }, [emotion, getDefaultKannadaSongs, getYouTubeUrl, shouldIncludeTimeSlot, createDefaultTimeSlots, getNextTimeSlot]);

  // Create fallback plan
  const createFallbackPlan = useCallback((emotionParam, startTime) => {
    const emotionTitles = {
      joy: "Joyful Day Plan",
      sad: "Comforting Day Plan",
      calm: "Peaceful Day Plan",
      neutral: "Balanced Day Plan",
      fear: "Grounding Day Plan",
      anxious: "Calming Day Plan"
    };
    
    const emotionFocus = {
      joy: "Harness your joyful energy for productivity and connection",
      sad: "Gentle self-care and comforting activities",
      calm: "Maintain your peaceful state with balanced activities",
      neutral: "Create structure while staying flexible",
      fear: "Ground yourself with comforting routines",
      anxious: "Reduce anxiety with predictable, calming activities"
    };
    
    return `**${emotionTitles[emotionParam] || "Your Day Plan"}**

**Focus:** ${emotionFocus[emotionParam] || "Creating a balanced and productive day"}

${startTime} - 9:00 AM: Morning Planning. Review your tasks and set intentions for the day.
9:00 AM - 10:30 AM: Focused Work Session. Tackle your most important project without distractions.
10:30 AM - 11:00 AM: Break with Music. Listen to Kannada songs to uplift your mood.
11:00 AM - 12:30 PM: Creative Tasks. Work on something that brings you joy or satisfaction.
12:30 PM - 1:30 PM: Lunch Break. Enjoy a nutritious meal away from screens.
1:30 PM - 3:00 PM: Learning Session. Study something new or develop a skill.
3:00 PM - 3:30 PM: Afternoon Recharge. Take a short walk or do light stretching.
3:30 PM - 5:00 PM: Final Tasks. Complete remaining work or personal projects.
5:00 PM - 6:00 PM: Evening Relaxation. Listen to calming Kannada music.

**Suggested Kannada Songs for ${emotionParam} mood:**
1. "Baare Baare" by S. P. Balasubrahmanyam - For joyful energy
2. "Kanne Kanne" from movie Kavacha - For emotional connection
3. "Male Nintu" by Rajkumar - For calming reflection
4. "Huttidare Kannada" by C. Ashwath - For patriotic upliftment

Remember: This is your day. Adjust as needed and be kind to yourself.`;
  }, []);

  // Fetch plan from API
  const fetchPlan = useCallback(async () => {
    if (loading) {
      console.log("Already loading, skipping request");
      return;
    }
    
    setLoading(true);
    setError(null);
    
    // Get emotion from localStorage
    let latestEmotion = "neutral";
    try {
      const storedEmotion = localStorage.getItem("recentEmotion");
      if (storedEmotion) {
        const parsed = JSON.parse(storedEmotion);
        latestEmotion = parsed?.emotion || "neutral";
      }
    } catch (err) {
      console.error("Error parsing emotion:", err);
    }
    
    setEmotion(latestEmotion);
    
    // Get current time info
    const currentIST = getCurrentISTTime();
    const nextSlotTime = getNextTimeSlot();
    setCurrentTimeIST(currentIST);
    
    // Enhanced prompt with YouTube search hint
    const prompt = `Create a personalized day plan for TODAY in Indian Standard Time (IST).
    
Current Time in IST: ${currentIST}
Plan should start from: ${nextSlotTime}

The user's current emotion is "${latestEmotion}". 

**IMPORTANT FORMATTING RULES:**
1. Start with a **Plan Title** on its own line
2. Then add **Focus:** with a one-sentence focus
3. List ONLY time slots from ${nextSlotTime} onward (not the whole day)
4. Format each time slot as: [Start Time - End Time]: [Activity Title]. [Brief description]
5. Include 6-8 time slots maximum
6. Suggest 3-4 popular Kannada songs that would enhance the "${latestEmotion}" mood
7. For each song, include the exact format: "Song Title" by Artist Name (from Movie Name if applicable)
8. End with a motivational note

Example format:
**Plan for Joyful Productivity**

**Focus:** Channel your joy into meaningful work and self-care

${nextSlotTime} - 9:00 AM: Morning Planning Session. Review your goals and plan the day with enthusiasm.
9:00 AM - 11:00 AM: Focused Creative Work. Work on your most important project with full energy.
11:00 AM - 11:30 AM: Break with Uplifting Music. Listen to Kannada music to maintain positive energy.

Suggested Kannada songs for ${latestEmotion} mood:
1. "Baare Baare" by S. P. Balasubrahmanyam - Classic uplifting song
2. "Kanne Kanne" from movie Kavacha - Emotional and soothing
3. "Male Nintu" by Rajkumar - Calming and reflective

Now create a plan specifically for ${latestEmotion} emotion starting from ${nextSlotTime}:`;

    // Use fallback if no API key
    if (!apiKey) {
      console.warn("No API key found, using fallback plan");
      const fallbackPlan = createFallbackPlan(latestEmotion, nextSlotTime);
      setPlan(fallbackPlan);
      parsePlanResponse(fallbackPlan);
      localStorage.setItem("dayPlan", fallbackPlan);
      localStorage.setItem("dayPlanEmotion", latestEmotion);
      setLoading(false);
      return;
    }
    
    try {
      const res = await axios.post(
        GEMINI_API_URL,
        {
          contents: [{ role: "user", parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.8,
            maxOutputTokens: 1000,
          }
        },
        {
          headers: { "Content-Type": "application/json" },
          timeout: 30000
        }
      );
      
      const text = res.data?.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (!text) {
        throw new Error("No response from API");
      }
      
      console.log("API Response:", text);
      
      // Save to localStorage
      localStorage.setItem("dayPlan", text);
      localStorage.setItem("dayPlanEmotion", latestEmotion);
      
      // Update state
      setPlan(text);
      parsePlanResponse(text);
      
    } catch (err) {
      console.error("API Error:", err);
      setError(err.message || "Failed to generate plan");
      
      // Use fallback
      const fallbackPlan = createFallbackPlan(latestEmotion, nextSlotTime);
      setPlan(fallbackPlan);
      parsePlanResponse(fallbackPlan);
      localStorage.setItem("dayPlan", fallbackPlan);
      localStorage.setItem("dayPlanEmotion", latestEmotion);
    } finally {
      setLoading(false);
    }
  }, [loading, apiKey, GEMINI_API_URL, getCurrentISTTime, getNextTimeSlot, createFallbackPlan, parsePlanResponse]);

  useEffect(() => {
    // Set current IST time
    setCurrentTimeIST(getCurrentISTTime());
    
    // Load saved plan
    const savedPlan = localStorage.getItem("dayPlan");
    const savedEmotion = localStorage.getItem("dayPlanEmotion");
    
    if (savedPlan) {
      setPlan(savedPlan);
      parsePlanResponse(savedPlan);
    }
    
    if (savedEmotion) {
      setEmotion(savedEmotion);
    } else {
      try {
        const recentEmotion = localStorage.getItem("recentEmotion");
        if (recentEmotion) {
          const parsed = JSON.parse(recentEmotion);
          setEmotion(parsed?.emotion || "neutral");
        }
      } catch (err) {
        console.error("Error parsing emotion:", err);
      }
    }
  }, [parsePlanResponse, getCurrentISTTime]);

  // Emotion-based color scheme
  const getEmotionColors = () => {
    const colors = {
      fear: { primary: "#8b5cf6", secondary: "#c4b5fd", accent: "#f5f3ff" },
      joy: { primary: "#f59e0b", secondary: "#fcd34d", accent: "#fffbeb" },
      sad: { primary: "#0ea5e9", secondary: "#7dd3fc", accent: "#f0f9ff" },
      angry: { primary: "#ef4444", secondary: "#fca5a5", accent: "#fef2f2" },
      neutral: { primary: "#6c63ff", secondary: "#8a84ff", accent: "#f8f9ff" },
      anxious: { primary: "#ec4899", secondary: "#f9a8d4", accent: "#fdf2f8" },
      calm: { primary: "#10b981", secondary: "#34d399", accent: "#f0fdf4" }
    };
    return colors[emotion.toLowerCase()] || colors.neutral;
  };

  const colors = getEmotionColors();

  // Activity type configuration
  const activityConfig = {
    rest: { icon: "😴", color: "#8b5cf6", bg: "#f5f3ff", label: "Rest" },
    food: { icon: "🍽️", color: "#10b981", bg: "#f0fdf4", label: "Meal" },
    work: { icon: "💼", color: "#3b82f6", bg: "#eff6ff", label: "Work" },
    exercise: { icon: "🏃", color: "#ef4444", bg: "#fef2f2", label: "Exercise" },
    break: { icon: "🧘", color: "#f59e0b", bg: "#fffbeb", label: "Break" },
    general: { icon: "⏰", color: colors.primary, bg: colors.accent, label: "General" }
  };

  return (
    <div
      className="d-flex flex-column flex-lg-row"
      style={{
        minHeight: "100vh",
        background: `linear-gradient(135deg, ${colors.accent} 0%, #ffffff 50%, ${colors.accent} 100%)`,
        position: "relative",
      }}
    >
      {/* Background decorations */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "400px",
          height: "400px",
          background: `radial-gradient(circle, ${colors.secondary}20 0%, transparent 70%)`,
          borderRadius: "50%",
          transform: "translate(150px, -150px)",
        }}
      />
      
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "300px",
          height: "300px",
          background: `radial-gradient(circle, ${colors.primary}15 0%, transparent 70%)`,
          borderRadius: "50%",
          transform: "translate(-100px, 100px)",
        }}
      />

      <Sidebar />
      
      <div 
        className="p-3 p-lg-4 flex-grow-1" 
        style={{ position: "relative", zIndex: 1, maxWidth: "1200px", margin: "0 auto", width: "100%" }}
      >
        <div
          className="card shadow-lg p-3 p-lg-4"
          style={{
            borderRadius: "24px",
            background: "linear-gradient(135deg, #ffffff 0%, #fafbff 100%)",
            border: `1px solid ${colors.secondary}30`,
            minHeight: "80vh",
          }}
        >
          {/* Header */}
          <div className="mb-4">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
              <div>
                <h2
                  className="fw-bold mb-2"
                  style={{
                    // background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                    // WebkitBackgroundClip: "text",
                    // WebkitTextFillColor: "transparent",
                    fontSize: "1.8rem",
                  }}
                >
                  📅 Your Personalized Day Plan
                </h2>
                <p className="text-muted mb-0">
                  Plan starts from next available time slot (IST)
                </p>
              </div>
              
              <div className="text-end">
                <div className="mb-2">
                  <small className="text-muted">Current IST Time:</small>
                  <div className="fw-bold" style={{ color: colors.primary }}>
                    {currentTimeIST || getCurrentISTTime()}
                  </div>
                </div>
                <button
                  className="btn btn-lg fw-bold d-flex align-items-center gap-2"
                  onClick={fetchPlan}
                  disabled={loading}
                  style={{
                    background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                    color: "white",
                    border: "none",
                    borderRadius: "12px",
                    padding: "12px 24px",
                    boxShadow: `0 4px 15px ${colors.primary}40`,
                    transition: "all 0.3s",
                  }}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <span>🔄</span>
                      Generate Plan
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Error Display */}
            {error && (
              <div className="alert alert-danger alert-dismissible fade show" role="alert">
                <strong>Error:</strong> {error}
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setError(null)}
                />
              </div>
            )}

            {/* Emotion & Focus Cards */}
            <div className="row g-3 mb-4">
              <div className="col-md-4">
                <div
                  className="card h-100 border-0 shadow-sm"
                  style={{
                    background: `linear-gradient(135deg, ${colors.accent}, #ffffff)`,
                    borderRadius: "16px",
                  }}
                >
                  <div className="card-body">
                    <div className="d-flex align-items-center gap-3">
                      <div
                        style={{
                          width: "50px",
                          height: "50px",
                          background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                          borderRadius: "12px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "24px",
                          color: "white",
                        }}
                      >
                        {emotion === "joy" ? "😊" : 
                         emotion === "sad" ? "😢" : 
                         emotion === "angry" ? "😠" : 
                         emotion === "fear" ? "😨" : 
                         emotion === "anxious" ? "😰" : 
                         emotion === "calm" ? "😌" : "😐"}
                      </div>
                      <div>
                        <small className="text-muted d-block">CURRENT EMOTION</small>
                        <h4 className="mb-0 fw-bold" style={{ color: colors.primary }}>
                          {emotion.charAt(0).toUpperCase() + emotion.slice(1)}
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="col-md-4">
                <div
                  className="card h-100 border-0 shadow-sm"
                  style={{
                    background: `linear-gradient(135deg, #ffffff, ${colors.accent})`,
                    borderRadius: "16px",
                  }}
                >
                  <div className="card-body">
                    <div className="d-flex align-items-center gap-3">
                      <div
                        style={{
                          width: "50px",
                          height: "50px",
                          background: `linear-gradient(135deg, ${colors.secondary}, ${colors.primary})`,
                          borderRadius: "12px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "24px",
                          color: "white",
                        }}
                      >
                        🎯
                      </div>
                      <div>
                        <small className="text-muted d-block">TODAY'S FOCUS</small>
                        <h5 className="mb-0" style={{ color: colors.primary }}>
                          {planFocus || "Creating a balanced day"}
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="col-md-4">
                <div
                  className="card h-100 border-0 shadow-sm"
                  style={{
                    background: `linear-gradient(135deg, ${colors.accent}, ${colors.secondary}20)`,
                    borderRadius: "16px",
                  }}
                >
                  <div className="card-body">
                    <div className="d-flex align-items-center gap-3">
                      <div
                        style={{
                          width: "50px",
                          height: "50px",
                          background: "linear-gradient(135deg, #FF0000, #FF3333)",
                          borderRadius: "12px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "24px",
                          color: "white",
                        }}
                      >
                        <FaYoutube />
                      </div>
                      <div>
                        <small className="text-muted d-block">KANNADA SONGS</small>
                        <h5 className="mb-0" style={{ color: "#FF0000" }}>
                          {kannadaSongs.length} Songs
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Area */}
          {loading ? (
            <div className="text-center py-5">
              <div className="position-relative d-inline-block mb-4">
                <div
                  className="spinner-border"
                  style={{
                    width: "4rem",
                    height: "4rem",
                    color: colors.primary,
                  }}
                />
              </div>
              <h4 className="fw-bold mb-2" style={{ color: colors.primary }}>
                Creating Your Day Plan
              </h4>
              <p className="text-muted">
                Starting from {getNextTimeSlot()} IST
              </p>
            </div>
          ) : plan && timeSlots.length > 0 ? (
            <div>
              {/* Plan Title */}
              <div className="text-center mb-4">
                <h1
                  className="fw-bold mb-3"
                  style={{
                    background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontSize: "2.2rem",
                  }}
                >
                  {planTitle}
                </h1>
                <div className="d-flex justify-content-center align-items-center gap-3">
                  <div
                    style={{
                      height: "4px",
                      width: "60px",
                      background: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})`,
                      borderRadius: "2px",
                    }}
                  />
                  <span className="text-muted">
                    {new Date().toLocaleDateString('en-IN', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </span>
                  <div
                    style={{
                      height: "4px",
                      width: "60px",
                      background: `linear-gradient(to right, ${colors.secondary}, ${colors.primary})`,
                      borderRadius: "2px",
                    }}
                  />
                </div>
              </div>

              {/* Time Slots */}
              <div className="row g-3 mb-5">
                {timeSlots.map((slot, index) => {
                  const config = activityConfig[slot.type] || activityConfig.general;
                  return (
                    <div key={index} className="col-12">
                      <div
                        className="card border-0 shadow-sm h-100"
                        style={{
                          borderRadius: "16px",
                          borderLeft: `4px solid ${config.color}`,
                          transition: "transform 0.2s",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "translateY(-2px)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "translateY(0)";
                        }}
                      >
                        <div className="card-body p-4">
                          <div className="row align-items-center">
                            <div className="col-md-3 mb-3 mb-md-0">
                              <div className="d-flex align-items-center gap-3">
                                <div
                                  style={{
                                    width: "60px",
                                    height: "60px",
                                    background: config.bg,
                                    borderRadius: "12px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: "28px",
                                  }}
                                >
                                  {config.icon}
                                </div>
                                <div>
                                  <div
                                    className="fw-bold"
                                    style={{
                                      fontSize: "1.1rem",
                                      color: "#2d3748",
                                    }}
                                  >
                                    {slot.time}
                                  </div>
                                  <span
                                    className="badge mt-1"
                                    style={{
                                      background: `${config.color}20`,
                                      color: config.color,
                                      fontSize: "0.75rem",
                                      fontWeight: "600",
                                    }}
                                  >
                                    {config.label}
                                  </span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="col-md-9">
                              <h5 className="fw-bold mb-2" style={{ color: "#1a202c" }}>
                                {slot.mainActivity}
                              </h5>
                              {slot.description && (
                                <p className="mb-0 text-muted">
                                  {slot.description}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Kannada Songs Section with YouTube Links */}
              {kannadaSongs.length > 0 && (
                <div className="mb-5">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <h4 className="fw-bold mb-0" style={{ color: colors.primary }}>
                      🎵 Kannada Music for {emotion} Mood
                    </h4>
                    <span className="text-muted small">
                      Click on any song to listen on YouTube
                    </span>
                  </div>
                  <div className="row g-3">
                    {kannadaSongs.map((song, index) => (
                      <div key={index} className="col-md-6 col-lg-4">
                        <a
                          href={song.youtubeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-decoration-none"
                        >
                          <div
                            className="card h-100 border-0 shadow-sm"
                            style={{
                              background: `linear-gradient(135deg, ${colors.accent}, #ffffff)`,
                              borderRadius: "12px",
                              border: `1px solid ${colors.secondary}30`,
                              transition: "all 0.3s ease",
                              cursor: "pointer",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.transform = "translateY(-4px)";
                              e.currentTarget.style.boxShadow = `0 8px 25px ${colors.primary}30`;
                              e.currentTarget.style.borderColor = "#FF0000";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform = "translateY(0)";
                              e.currentTarget.style.boxShadow = "";
                              e.currentTarget.style.borderColor = `${colors.secondary}30`;
                            }}
                          >
                            <div className="card-body">
                              <div className="d-flex align-items-start gap-3">
                                <div
                                  style={{
                                    width: "50px",
                                    height: "50px",
                                    background: "linear-gradient(135deg, #FF0000, #FF3333)",
                                    borderRadius: "10px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: "24px",
                                    color: "white",
                                    flexShrink: 0,
                                  }}
                                >
                                  <FaYoutube />
                                </div>
                                <div style={{ flex: 1 }}>
                                  <div className="d-flex justify-content-between align-items-start mb-1">
                                    <h6 className="fw-bold mb-0" style={{ color: "#1a202c" }}>
                                      {song.title}
                                    </h6>
                                    <FaExternalLinkAlt 
                                      size={12} 
                                      className="text-muted"
                                      style={{ marginTop: "4px" }}
                                    />
                                  </div>
                                  <p className="text-muted mb-2 small" style={{ lineHeight: "1.4" }}>
                                    {song.artist}
                                  </p>
                                  <div className="d-flex align-items-center">
                                    <span
                                      className="badge"
                                      style={{
                                        background: `${colors.primary}15`,
                                        color: colors.primary,
                                        fontSize: "0.7rem",
                                        fontWeight: "500",
                                        padding: "4px 8px",
                                      }}
                                    >
                                      Click to listen
                                    </span>
                                    <span className="ms-2 small text-muted">
                                      #{index + 1}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </a>
                      </div>
                    ))}
                  </div>
                  
                  {/* Quick Play Section */}
                  <div className="mt-4">
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <FaYoutube className="text-danger" />
                      <span className="small text-muted">
                        Quick YouTube search links:
                      </span>
                    </div>
                    <div className="d-flex flex-wrap gap-2">
                      {kannadaSongs.map((song, index) => (
                        <a
                          key={index}
                          href={song.youtubeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-sm"
                          style={{
                            background: `${colors.primary}10`,
                            color: colors.primary,
                            border: `1px solid ${colors.primary}30`,
                            borderRadius: "20px",
                            padding: "4px 12px",
                            fontSize: "0.85rem",
                            textDecoration: "none",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = colors.primary;
                            e.currentTarget.style.color = "white";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = `${colors.primary}10`;
                            e.currentTarget.style.color = colors.primary;
                          }}
                        >
                          <FaYoutube className="me-1" size={12} />
                          Song #{index + 1}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Tips Section */}
              <div className="mt-4 pt-4 border-top">
                <div className="row align-items-center">
                  <div className="col-lg-10">
                    <h5 className="fw-bold mb-2" style={{ color: colors.primary }}>
                      💡 Remember
                    </h5>
                    <p className="text-muted mb-0">
                      This plan starts from the next available time slot. Click on any song to listen on YouTube. 
                      Adjust the plan as needed based on how you're feeling.
                    </p>
                  </div>
                  <div className="col-lg-2 text-lg-end mt-3 mt-lg-0">
                    <a
                      href="https://www.youtube.com/results?search_query=kannada+songs"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm d-inline-flex align-items-center"
                      style={{
                        background: "#FF0000",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        padding: "8px 16px",
                        textDecoration: "none",
                      }}
                    >
                      <FaYoutube className="me-2" />
                      More Songs
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div
              className="text-center py-5"
              style={{
                borderRadius: "20px",
                border: `2px dashed ${colors.secondary}`,
                background: colors.accent,
              }}
            >
              <div className="mb-4" style={{ fontSize: "4rem", opacity: 0.7 }}>
                📅
              </div>
              <h4 className="fw-bold mb-3" style={{ color: colors.primary }}>
                Your Day Plan Starts Here
              </h4>
              <p className="text-muted mb-4">
                We'll create a personalized schedule starting from {getNextTimeSlot()} IST
                <br />with Kannada music recommendations for your <strong>{emotion}</strong> mood
              </p>
              <button
                className="btn px-4 py-2 fw-bold"
                onClick={fetchPlan}
                style={{
                  background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                  color: "white",
                  border: "none",
                  borderRadius: "10px",
                }}
              >
                ✨ Generate Plan with Music
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

