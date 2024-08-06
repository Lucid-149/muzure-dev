import PocketBase from 'pocketbase';

const pb = new PocketBase("https://perigee.pockethost.io");

export const url = process.env.DATABASEURL

export default pb
