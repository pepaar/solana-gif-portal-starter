import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { Program, Provider, web3 } from "@project-serum/anchor";
import kp from "../keys/keypair.json";

// SystemProgram is a reference to the Solana runtime!
const { SystemProgram } = web3;

// Create a keypair for the account that will hold the GIF data.
const arr = Object.values(kp._keypair.secretKey);
const secret = new Uint8Array(arr);
const baseAccount = web3.Keypair.fromSecretKey(secret);

// This is the address of your solana program, if you forgot, just run solana address -k target/deploy/gifportal-keypair.json
const programID = new PublicKey("GzYepFckF3B1PqvREVMH679hBgdBedcoK4Cf13WXV6hc");

// Set our network to devnet.
const network = clusterApiUrl("devnet");

// Controls how we want to acknowledge when a transaction is "done".
const opts = {
  preflightCommitment: "processed",
};

export const getGifList = async () => {
  try {
    const program = await getProgram();
    const account = await program.account.baseAccount.fetch(baseAccount.publicKey);

    console.log("Got the account", account);
    return account.gifList;
  } catch (error) {
    console.log("Error in getGifList: ", error);
    throw error;
  }
};

export const addGif = async (gifLink) => {
  if (gifLink.length === 0) {
    console.log("No gif link given!");
    return;
  }
  console.log("Gif link to be added:", gifLink);

  try {
    const provider = getProvider();
    const program = await getProgram();

    await program.rpc.addGif(gifLink, {
      accounts: {
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey,
      },
    });
    console.log("GIF successfully sent to program", gifLink);
  } catch (error) {
    console.log("Error sending GIF:", error);
  }
};

export const initializeProgramBaseAccount = async () => {
  try {
    const provider = getProvider();
    const program = await getProgram();

    console.log("ping");
    await program.rpc.startStuffOff({
      accounts: {
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [baseAccount],
    });
    console.log("Created a new BaseAccount w/ address:", baseAccount.publicKey.toString());
  } catch (error) {
    console.log("Error creating BaseAccount account:", error);
  }
};

const getProvider = () => {
  const connection = new Connection(network, opts.preflightCommitment);
  const provider = new Provider(connection, window.solana, opts.preflightCommitment);
  return provider;
};

const getProgram = async () => {
  // Get metadata about your solana program
  const idl = await Program.fetchIdl(programID, getProvider());
  return new Program(idl, programID, getProvider());
};
