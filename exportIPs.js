// exportIPs.js

const { Firestore } = require('@google-cloud/firestore');
const fs = require('fs');

// Initialize Firestore
const firestore = new Firestore();

async function exportIPs() {
    try {
        const snapshot = await firestore.collection('ipAddresses').get();
        const ipAddresses = snapshot.docs.map(doc => doc.data().ip).join('\n');
        fs.writeFileSync('IP ADDRESS LIST.txt', ipAddresses);
        console.log('IP addresses exported successfully');
    } catch (error) {
        console.error('Error exporting IP addresses:', error);
    }
}

exportIPs();
