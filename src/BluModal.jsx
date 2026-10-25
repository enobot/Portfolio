import { useEffect, useId, useRef, useState } from "react";
import "./BluModal.css";
import { lockPageScroll } from "./lockPageScroll.js";

const repo = "https://github.com/Blu-Organization/FinalGFFinder";

const categories = [
  "Action",
  "Adventure",
  "Shooter",
  "MMORPG",
  "RPG",
  "Strategy",
  "Puzzle",
  "Sports",
  "Racing",
  "Fighting",
];

const games = [
  { name: "League of Legends", type: "Action" },
  { name: "Fortnite", type: "Action" },
  { name: "Battlefield", type: "Shooter" },
  { name: "Valorant", type: "Shooter" },
  { name: "Escape From Tarkov", type: "Shooter" },
  { name: "Among Us", type: "Strategy" },
  { name: "World of Warcraft", type: "MMORPG" },
  { name: "Final Fantasy XIV", type: "MMORPG" },
  { name: "Elden Ring", type: "RPG" },
  { name: "Stardew Valley", type: "Adventure" },
  { name: "Mario Kart", type: "Racing" },
  { name: "Street Fighter", type: "Fighting" },
  { name: "Portal", type: "Puzzle" },
  { name: "Rocket League", type: "Sports" },
];

const friends = [
  { username: "Isaac_Hermiston", status: "online", region: "Demacia", playertype: "casual gamer", game: "Valorant" },
  { username: "Lia68", status: "online", region: "Ionia", playertype: "master", game: "League of Legends" },
  { username: "Marlon84", status: "offline", region: "Piltover", playertype: "beginner", game: "Among Us" },
  { username: "Della_Goldner", status: "online", region: "Zaun", playertype: "casual gamer", game: "Fortnite" },
  { username: "Consuelo_Stamm", status: "online", region: "Noxus", playertype: "master", game: "Valorant" },
  { username: "Joey_Huel89", status: "offline", region: "Bilgewater", playertype: "casual gamer", game: "Elden Ring" },
];

const teams = [
  { name: "Night Queue", leader: "Isaac_Hermiston", members: ["Cletus82", "Consuelo_Stamm"] },
  { name: "Last Light", leader: "Lia68", members: ["Della_Goldner", "Cletus82"] },
];

const demoAccount = {
  email: "cletus82@demo.blu",
  password: "player",
  username: "Cletus82",
  region: "Piltover",
  playertype: "casual gamer",
};

function Logo() {
  return (
    <span className="blu-logo">
      <span className="blu-mark" aria-hidden="true">
        <svg viewBox="0 0 32 32">
          <rect x="4" y="10" width="24" height="12" rx="6" />
          <circle cx="11" cy="16" r="1.4" />
          <circle cx="21" cy="14.5" r="1.2" />
          <circle cx="24" cy="17.5" r="1.2" />
        </svg>
      </span>
      <span>
        <strong>G.F. FINDER</strong>
        <small>Where gamers find friends</small>
      </span>
    </span>
  );
}

export default function BluModal({ onClose }) {
  const titleId = useId();
  const dialogRef = useRef(null);
  const panelRef = useRef({});
  const [screen, setScreen] = useState("gate");
  const [accounts, setAccounts] = useState([demoAccount]);
  const [user, setUser] = useState(null);
  const [login, setLogin] = useState({ email: demoAccount.email, password: demoAccount.password });
  const [signup, setSignup] = useState({ username: "", email: "", password: "" });
  const [formError, setFormError] = useState("");
  const [category, setCategory] = useState(null);
  const [selectedGame, setSelectedGame] = useState(null);
  const [activeFriend, setActiveFriend] = useState(null);
  const [showTeams, setShowTeams] = useState(false);
  const [query, setQuery] = useState("");
  panelRef.current = { category, activeFriend, showTeams };

  useEffect(() => {
    const dialog = dialogRef.current;
    const focusable = () =>
      [...dialog.querySelectorAll("a, button, input")].filter(
        (node) => !node.hasAttribute("disabled"),
      );
    focusable()[0]?.focus();

    function onKey(event) {
      if (event.key === "Escape") {
        event.preventDefault();
        const panel = panelRef.current;
        if (panel.category) {
          setCategory(null);
          return;
        }
        if (panel.activeFriend) {
          setActiveFriend(null);
          return;
        }
        if (panel.showTeams) {
          setShowTeams(false);
          return;
        }
        onClose();
        return;
      }
      if (event.key !== "Tab") return;
      const items = focusable();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKey);
    const unlockScroll = lockPageScroll();
    return () => {
      document.removeEventListener("keydown", onKey);
      unlockScroll();
    };
  }, [onClose]);

  function openLogin() {
    setFormError("");
    setScreen("login");
  }

  function submitLogin(event) {
    event.preventDefault();
    const match = accounts.find(
      (account) =>
        account.email.toLowerCase() === login.email.trim().toLowerCase() &&
        account.password === login.password,
    );
    if (!match) {
      setFormError("Incorrect login");
      return;
    }
    setUser(match);
    setFormError("");
    setScreen("play");
  }

  function submitSignup(event) {
    event.preventDefault();
    if (!signup.username.trim() || !signup.email.trim() || !signup.password) {
      setFormError("Username, email, and password are required.");
      return;
    }
    const account = {
      email: signup.email.trim(),
      password: signup.password,
      username: signup.username.trim(),
      region: "Bandle City",
      playertype: "beginner",
    };
    setAccounts((current) => [...current, account]);
    setUser(account);
    setFormError("");
    setScreen("play");
  }

  function logout() {
    setUser(null);
    setSelectedGame(null);
    setCategory(null);
    setActiveFriend(null);
    setShowTeams(false);
    setQuery("");
    setScreen("gate");
  }

  function chooseGame(game) {
    setSelectedGame(game);
    setCategory(null);
    setActiveFriend(null);
  }

  const lobbyFriends = friends.filter((friend) => {
    if (selectedGame) return friend.game === selectedGame.name;
    if (!query.trim()) return false;
    const needle = query.trim().toLowerCase();
    return (
      friend.game.toLowerCase().includes(needle) ||
      friend.username.toLowerCase().includes(needle)
    );
  });

  const categoryGames = games.filter((game) => game.type === category);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal blu-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        ref={dialogRef}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-top">
          <h2 id={titleId}>BLU</h2>
          <button type="button" className="close" onClick={onClose}>
            Close
          </button>
        </div>

        <section>
          <h3>The project</h3>
          <p>
            BLU is G.F. Finder, a social app for putting a team together before
            a match. Players sign up, log in, pick a game, and see who is
            already around. The live app is React on an Express API, with
            players, friends, teams, and games stored in MySQL.
          </p>
        </section>

        <section className="demo-section">
          <h3>Demo</h3>
          <p className="demo-lead">
            In-browser walkthrough with sample players. Log in is filled in
            for the demo account.
          </p>

          <div className="blu-stage">
            <div className="blu-nav">
              <Logo />
              <div className="blu-nav-actions">
                <button type="button" onClick={() => setScreen("about")}>
                  About Us
                </button>
                {user ? (
                  <>
                    <button type="button" onClick={logout}>
                      Log out
                    </button>
                    <span className="blu-user">{user.username}</span>
                  </>
                ) : (
                  <>
                    <button type="button" onClick={() => { setFormError(""); setScreen("signup"); }}>
                      Sign Up
                    </button>
                    <button type="button" onClick={openLogin}>
                      Have an account? Log in!
                    </button>
                  </>
                )}
              </div>
            </div>

            {screen === "gate" && (
              <div className="blu-gate">
                <p>Find a team before the match starts.</p>
                <button type="button" className="blu-primary" onClick={openLogin}>
                  Log in and open the lobby
                </button>
              </div>
            )}

            {screen === "about" && (
              <div className="blu-panel">
                <h4>About Us</h4>
                <ul>
                  <li>Paul Choi</li>
                  <li>Justin Murakami</li>
                  <li>Tracy Tran</li>
                </ul>
                <p>Built so players can find a team and skip the pre-game scramble.</p>
                <button type="button" onClick={() => setScreen(user ? "play" : "gate")}>
                  Back
                </button>
              </div>
            )}

            {screen === "login" && (
              <form className="blu-panel blu-form" onSubmit={submitLogin}>
                <h4>Login to find some friends!</h4>
                <label>
                  Email
                  <input
                    name="email"
                    type="email"
                    autoComplete="username"
                    value={login.email}
                    maxLength={254}
                    onChange={(event) => setLogin({ ...login, email: event.target.value.slice(0, 254) })}
                  />
                </label>
                <label>
                  Password
                  <input
                    name="password"
                    type="text"
                    autoComplete="current-password"
                    value={login.password}
                    maxLength={80}
                    onChange={(event) => setLogin({ ...login, password: event.target.value.slice(0, 80) })}
                  />
                </label>
                {formError ? <p className="blu-error">{formError}</p> : null}
                <button type="submit" className="blu-primary">
                  Submit
                </button>
              </form>
            )}

            {screen === "signup" && (
              <form className="blu-panel blu-form" onSubmit={submitSignup}>
                <h4>Create an account</h4>
                <label>
                  Username
                  <input
                    name="username"
                    value={signup.username}
                    maxLength={40}
                    onChange={(event) => setSignup({ ...signup, username: event.target.value.slice(0, 40) })}
                  />
                </label>
                <label>
                  Email
                  <input
                    name="email"
                    type="email"
                    value={signup.email}
                    maxLength={254}
                    onChange={(event) => setSignup({ ...signup, email: event.target.value.slice(0, 254) })}
                  />
                </label>
                <label>
                  Password
                  <input
                    name="password"
                    type="text"
                    value={signup.password}
                    maxLength={80}
                    onChange={(event) => setSignup({ ...signup, password: event.target.value.slice(0, 80) })}
                  />
                </label>
                {formError ? <p className="blu-error">{formError}</p> : null}
                <button type="submit" className="blu-primary">
                  Sign up
                </button>
              </form>
            )}

            {screen === "play" && user && (
              <div className="blu-board">
                <section className="blu-col" aria-label="Game categories">
                  <h4>Game Categories</h4>
                  <ul>
                    {categories.map((name) => (
                      <li key={name}>
                        <button type="button" onClick={() => { setCategory(name); setActiveFriend(null); }}>
                          {name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="blu-col blu-center" aria-label="Lobby">
                  <label className="blu-search">
                    <span className="blu-sr">Find a friend by game</span>
                    <input
                      value={query}
                      maxLength={40}
                      placeholder="Enter a game to find a friend..."
                      onChange={(event) => {
                        setQuery(event.target.value.slice(0, 40));
                        setActiveFriend(null);
                      }}
                    />
                  </label>

                  {category ? (
                    <div className="blu-catalog">
                      <p>Game type: {category}</p>
                      <button type="button" onClick={() => setCategory(null)}>
                        Close
                      </button>
                      <ul>
                        {categoryGames.length === 0 ? (
                          <li>No sample games in this category.</li>
                        ) : (
                          categoryGames.map((game) => (
                            <li key={game.name}>
                              <button type="button" onClick={() => chooseGame(game)}>
                                {game.name}
                              </button>
                            </li>
                          ))
                        )}
                      </ul>
                    </div>
                  ) : activeFriend ? (
                    <div className="blu-card">
                      <p className="blu-kicker">{activeFriend.status}</p>
                      <h4>{activeFriend.username}</h4>
                      <p>{activeFriend.region} · {activeFriend.playertype}</p>
                      <p>Playing {activeFriend.game}</p>
                      <button type="button" onClick={() => setActiveFriend(null)}>
                        Close
                      </button>
                    </div>
                  ) : (
                    <div className="blu-lobby">
                      <h4>Lobby</h4>
                      {selectedGame ? (
                        <>
                          <p>Players around {selectedGame.name}</p>
                          <ul>
                            {lobbyFriends.length === 0 ? (
                              <li>Nobody in this lobby yet. Try Valorant or League of Legends.</li>
                            ) : (
                              lobbyFriends.map((friend) => (
                                <li key={friend.username}>
                                  <button type="button" onClick={() => setActiveFriend(friend)}>
                                    {friend.username}
                                    <span>{friend.status}</span>
                                  </button>
                                </li>
                              ))
                            )}
                          </ul>
                        </>
                      ) : lobbyFriends.length > 0 ? (
                        <ul>
                          {lobbyFriends.map((friend) => (
                            <li key={friend.username}>
                              <button type="button" onClick={() => setActiveFriend(friend)}>
                                {friend.username}
                                <span>{friend.game}</span>
                              </button>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p>Choose a game to see the lobby...</p>
                      )}
                    </div>
                  )}

                  <div className="blu-chat">
                    <h4>Global Chat Room</h4>
                    <p>{selectedGame ? `${selectedGame.name} lobby is open.` : "No game selected..."}</p>
                  </div>
                </section>

                <section className="blu-col" aria-label="Friends and teams">
                  <button type="button" className="blu-chip" onClick={() => setShowTeams((open) => !open)}>
                    {showTeams ? "Show Friends" : "Show Teams"}
                  </button>
                  {showTeams ? (
                    <>
                      <h4>Teams</h4>
                      <ul className="blu-people">
                        {teams.map((team) => (
                          <li key={team.name}>
                            <strong>{team.name}</strong>
                            <span>Lead {team.leader}</span>
                            <span>{team.members.join(", ")}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <>
                      <h4>My GFriends</h4>
                      <ul className="blu-people">
                        {friends.map((friend) => (
                          <li key={friend.username}>
                            <button type="button" onClick={() => { setActiveFriend(friend); setCategory(null); }}>
                              <i className={friend.status} aria-hidden="true" />
                              {friend.username}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </section>
              </div>
            )}
          </div>

          <p className="repo-line">
            Check out my repo:{" "}
            <a className="repo-link" href={repo} target="_blank" rel="noopener noreferrer">
              github.com/Blu-Organization/FinalGFFinder
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
