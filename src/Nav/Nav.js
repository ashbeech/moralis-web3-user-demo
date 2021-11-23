import React, { useState } from "react";
import Overlay from "./Overlay";
import { Image, Link, Button, Center, Box } from "@chakra-ui/react";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import { useMoralis } from "react-moralis";

export default function Nav() {
  let [isOpen, setIsOpen] = useState(false);
  let [link, setLink] = useState("");
  let [active, setActive] = useState("");
  let transitionLink = null;

  const { user } = useMoralis();

  const transitionCheck = () => {
    setLink(transitionLink);
    setIsOpen(!isOpen);
    setActive(true);
  };

  const handleClick1 = (props) => {
    if (link === "") {
      setIsOpen(!isOpen);
      setActive(true);
    }

    if (link === props.target.name) {
      setLink("");
      setActive(false);
    } else {
      if (props.target.name !== link && active) {
        setActive(false);
        transitionLink = props.target.name;
      } else {
        setLink(props.target.name);
        setActive(true);
        transitionLink = null;
      }
    }

    if ("home" === props.target.name) {
      setLink("");
      setActive(false);
      setIsOpen(false);
      transitionLink = null;
    } else {
      setIsOpen(!isOpen);
    }
  };

  return (
    <>
      <Box className="nav_wrapper">
        <Box className="pinned-parent">
          <Box className="pinned">
            <Button
              name="about"
              isActive={isOpen}
              onClick={handleClick1}
              colorScheme="teal"
              variant=""
              border="0"
              outline="0"
              outline-offset="0"
              className={link === "about" ? "active" : ""}
              leftIcon={"+"}
            >
              About
            </Button>
          </Box>
          <Box className="pinned">
            <Button
              name="connect"
              isActive={isOpen}
              onClick={handleClick1}
              colorScheme="teal"
              variant=""
              border="0"
              outline="0"
              outline-offset="0"
              className={link === "connect" ? "active" : ""}
              leftIcon={"+"}
            >
              {user ? "Connected" : "Connect"}
            </Button>
          </Box>
          <Box className="pinned">
            <Button
              name="contact"
              isActive={isOpen}
              onClick={handleClick1}
              colorScheme="teal"
              variant=""
              border="0"
              outline="0"
              outline-offset="0"
              className={link === "contact" ? "active" : ""}
              leftIcon={"+"}
            >
              Contact
            </Button>
          </Box>
        </Box>
        <Box className="logo">
          <Link name="home" onClick={handleClick1}>
            <Image
              name="home"
              borderRadius="full"
              objectFit="contain"
              src="./img/logo.svg"
              alt="Moralis Web3"
            />
          </Link>
        </Box>
        <Center className={"copyright-wrapper active"}>
          <div className="copyright">© 2021</div>
        </Center>
      </Box>
      <TransitionGroup component={null}>
        {active && (
          <CSSTransition
            in={isOpen}
            onExited={() =>
              transitionLink !== null ? transitionCheck() : false
            }
            classNames={{
              appear: "box-appear",
              appearActive: "box-active-appear",
              appearDone: "box-done-appear",
              enter: "box-enter",
              enterActive: "box-active-enter",
              enterDone: "box-done-enter",
              exit: "box-exit",
              exitActive: "box-active-exit",
              exitDone: "box-done-exit",
            }}
            timeout={200}
          >
            <Overlay toggleData={active} linkData={link} />
          </CSSTransition>
        )}
      </TransitionGroup>
    </>
  );
}
