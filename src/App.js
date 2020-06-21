import React from "react";
import { Pane, Heading } from "evergreen-ui";
import ChartWrapper from "./components/ChartWrapper";

function App() {
  return (
    <Pane
      background="greenTint"
      width="100vw"
      height="100vh"
      padding={16}
      paddingTop={0}
    >
      <Pane
        display="flex"
        background="tint2"
        borderRadius={3}
        marginBottom={16}
        paddingTop={16}
        paddingBottom={16}
      >
        <Pane flex={1} alignItems="center" display="flex">
          <Heading size={600}>Gilead Stats</Heading>
        </Pane>
      </Pane>
      <Pane marginTop={16} marginBottom={16}>
        <ChartWrapper chartId={"test-chart"} />
      </Pane>
    </Pane>
  );
}

export default App;
