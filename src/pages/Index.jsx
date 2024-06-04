import React from "react";
import { Container, Box, Heading, Text, VStack, HStack, Button, List, ListItem, Image, IconButton } from "@chakra-ui/react";
import { FaPlay } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const MovieDetail = ({ movie }) => {
  const navigate = useNavigate();

  const handlePlay = () => {
    navigate(`/player/${movie.id}`);
  };

  return (
    <Container maxW="container.lg" py={8}>
      <VStack spacing={6} align="start">
        <Box width="100%" position="relative" paddingBottom="56.25%" height="0">
          <iframe src={movie.trailerUrl} title={movie.title} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </Box>
        <Heading as="h1" size="xl">
          {movie.title}
        </Heading>
        <Text fontSize="lg">{movie.description}</Text>
        <HStack spacing={4}>
          <Text fontWeight="bold">Duration:</Text>
          <Text>{movie.duration}</Text>
        </HStack>
        <Box>
          <Heading as="h2" size="md" mb={2}>
            Cast
          </Heading>
          <List spacing={2}>
            {movie.cast.map((actor, index) => (
              <ListItem key={index}>{actor}</ListItem>
            ))}
          </List>
        </Box>
        {movie.seasons && (
          <Box width="100%">
            <Heading as="h2" size="md" mb={2}>
              Seasons
            </Heading>
            {movie.seasons.map((season, index) => (
              <Box key={index} mb={4}>
                <Heading as="h3" size="sm" mb={2}>
                  Season {season.number}
                </Heading>
                <List spacing={2}>
                  {season.episodes.map((episode, epIndex) => (
                    <ListItem key={epIndex}>
                      <HStack justifyContent="space-between">
                        <Text>{episode.title}</Text>
                        <Button size="sm" onClick={() => navigate(`/player/${movie.id}/season/${season.number}/episode/${episode.number}`)}>
                          Play
                        </Button>
                      </HStack>
                    </ListItem>
                  ))}
                </List>
              </Box>
            ))}
          </Box>
        )}
        <Button leftIcon={<FaPlay />} colorScheme="teal" onClick={handlePlay}>
          Play
        </Button>
      </VStack>
    </Container>
  );
};

const Index = () => {
  const movie = {
    id: 1,
    title: "Sample Movie",
    description: "This is a sample movie description.",
    trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: "2h 30m",
    cast: ["Actor 1", "Actor 2", "Actor 3"],
    seasons: [
      {
        number: 1,
        episodes: [
          { number: 1, title: "Episode 1" },
          { number: 2, title: "Episode 2" },
        ],
      },
      {
        number: 2,
        episodes: [
          { number: 1, title: "Episode 1" },
          { number: 2, title: "Episode 2" },
        ],
      },
    ],
  };

  return <MovieDetail movie={movie} />;
};

export default Index;
