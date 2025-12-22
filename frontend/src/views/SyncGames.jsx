import { useState } from "react";
import { Button, ProgressBar, Container, Card, Alert } from "react-bootstrap";
import { gameService } from "../services/gameService.js"; // or wherever you put it
import { useNavigate } from "react-router-dom";

export default function SyncGames() {
  const [status, setStatus] = useState("idle"); // idle, fetching_list, syncing, complete, error
  const [progress, setProgress] = useState(0);
  const [total, setTotal] = useState(0);
  const [currentGameId, setCurrentGameId] = useState("");
  const [logs, setLogs] = useState([]);

  const navigate = useNavigate();

  const startSync = async () => {
    try {
      setStatus("fetching_list");
      addLog("Fetching game list from Steam...");

      const gamesList = await gameService.getOwnedIds();

      if (!gamesList || gamesList.length === 0) {
        addLog("No games found.");
        setStatus("complete");
        return;
      }

      setTotal(gamesList.length);
      setProgress(0);
      setStatus("syncing");
      addLog(`Found ${gamesList.length} games. Starting sync...`);

      // loop through games one by one
      for (let i = 0; i < gamesList.length; i++) {
        const game = gamesList[i];
        const appId = game.appid;
        const name = game.name;
        setCurrentGameId(appId);

        // get further game data
        try {
          await gameService.syncGame(appId, name);
        } catch (e) {
          console.error(`Failed to sync ${appId}`, e);
          addLog(`Error syncing AppID ${appId}, skipping...`);
        }

        // update progress bar
        setProgress(i + 1);

        // trying not to get rate limited by steam (and thus incinerated)
        await new Promise(r => setTimeout(r, 1500));
      }

      setStatus("complete");
      addLog("Sync complete!");

    } catch (error) {
      console.error(error);
      setStatus("error");
      addLog("Critical error during sync.");
    }
  };

  const addLog = (msg) => {
    setLogs(prev => [...prev.slice(-4), msg]); // keep last 5 logs
  };

  return (
    <Container className="mt-5" style={{ maxWidth: "600px" }}>
      <Card className="p-4 shadow-sm">
        <h3 className="mb-3">Library Synchronization</h3>
        <p className="text-muted">
          This process will fetch your Steam games and their related data.
          Please keep this window open.
        </p>

        {status === "idle" && (
          <Button onClick={startSync} variant="primary" size="lg">
            Start Sync
          </Button>
        )}

        {(status === "fetching_list" || status === "syncing") && (
          <div>
            <ProgressBar
              animated
              now={(progress / total) * 100}
              label={`${Math.round((progress / total) * 100)}%`}
              className="mb-3"
            />
            <div className="d-flex justify-content-between text-muted small">
              <span>Processed: {progress} / {total}</span>
              <span>Current AppID: {currentGameId}</span>
            </div>
          </div>
        )}

        {status === "complete" && (
          <Alert variant="success">
            <Alert.Heading>Success!</Alert.Heading>
            <p>Your library has been successfully updated.</p>
            <hr />
            <div className="d-flex justify-content-end">
              <Button variant="outline-success" onClick={() => navigate("/")}>
                Go to Library
              </Button>
            </div>
          </Alert>
        )}

        {status === "error" && (
          <Alert variant="danger">Something went wrong. Check console.</Alert>
        )}

        {/* mini console */}
        <div className="mt-4 p-2 bg-light border rounded" style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>
          {logs.map((log, idx) => <div key={idx}>{log}</div>)}
        </div>
      </Card>
    </Container>
  );
}