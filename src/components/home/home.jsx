import logo from "../../boat.jpg";
import logo2 from "../../flwr.jpg";
import logo3 from "../../beach.jpg";
import icon from "../../piano.jpg";
import "./home.css";
import { Stack, Paper, Avatar } from "@mui/material";
import { styled } from "@mui/material/styles";
import { MusicNote, Sailing } from "@mui/icons-material";

export const Home = () =>{

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.primary,
  }));

  return (
    <div className="App">
      <body className="App-header">
        <p className="title">
          <Avatar alt="Remy Sharp" src={icon} sx={{ width: 75, height: 75 }} />{" "}
          Hey, I'm Chavi!
        </p>
        <p>
          I am a senior at Touro College studying Computer Science. This is my
          first webpage using React (woohoo!) I love to code and to learn more
          about Computer Science. I am very excited to start a software
          engineering internship this summer at DTCC in New Jersey. On the side,
          I occasionally teach paint night classes to groups of children,
          adults, family or friends in the neighborhood.
        </p>
        <p className="pics">
          <Stack direction="row" spacing={7}>
            <Item>
              <img src={logo2} />
            </Item>
            <Item>
              <img src={logo} />
            </Item>
            <Item>
              <img src={logo3} />
            </Item>
          </Stack>
        </p>
        <p>
          In my free time I enjoy art, being outdoors, and spending time with
          family and friends. Some other things that make me happy are the
          beach, camping, strawberries, biking, ice cream, snowflakes, and
          waterfalls. I took a few piano lesson and now trying to teach myself
          more. I would also love to learn how to sail <Sailing /> and play the
          harp
          <MusicNote />
        </p>

        <p>Oh, and I like to bake and decorate cookies too!</p>
      </body>
    </div>
  );


}
//export default App;
