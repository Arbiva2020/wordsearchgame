import React from "react";

class MyActionListener {
    constructor() {
        this.actions = {}; 
    }

    registerListener(action, listener) {
        if (!this.actions[action]) {
            this.actions[action] = []; 
        }
        this.actions[action].push(listener);
    }

    removeListener(action) {
        if (!this.actions[action]) {
            throw new Error(`Can't remove listener. Action "${action}" doesn't exist.`);
        }
        delete this.actions[action]; 
    }

    emit(action, data) {
        if (!this.actions[action]) {
            throw new Error(`Can't emit an event. Event "${action}" doesn't exist.`);
        }
        this.actions[action].forEach(listener => listener(data)); 
    }
}


const actionListener = new MyActionListener();


actionListener.registerListener("PRINT", (data) =>
    console.log(`Don't tell me what I ${data} or ${data}'t do`)
);
actionListener.registerListener("PRINT", (data) =>
    console.log(`I eat pickles right off the ${data}`)
);

// Emit the "PRINT" action before removing it
actionListener.emit("PRINT", "Can");

// Remove the "PRINT" action
actionListener.removeListener("PRINT");

// Try emitting again (this will throw an error)
try {
    actionListener.emit("PRINT", "Can");
} catch (error) {
    console.error(error.message); // Logs: Can't emit an event. Event "PRINT" doesn't exist.
}






// class MyActionListener {
//     constructor(props) {
//         super(props);
//         this.state = {
//             action: {
//                 name: "",
//             },
//         }
//     }

   
//     registerListener(action, listener) {
//         if (this.state.action.name === action) {
//             this.state.action.listeners.push(listener);
//         } else {
//             this.state.action = {
//                 name: action,
//                 listeners: [listener],
//             };
//         }
//     }


//     removeListener(action) {
//         if (this.state.action.name === action) {
//             this.state.action = {
//                 name: "",
//                 listeners: [],
//             };
//         } else {
//             throw new Error(`Can't remove listener. Action "${action}" doesn't exist.`);
//         }
//     }


//     emit(action, data) {
//         if (this.state.action.name === action) {
//             this.state.action.listeners.forEach((listener) => {
//                 listener(data);
//             });
//         } else {
//             throw new Error(`Can't emit an event. Event "${action}" doesn't exits.`);
//         }
//     }


//     actionListener = new MyActionListener(
//         registerListener("PRINT", (data) =>
//             console.log(`Don't tell me what I ${data} or ${data}'t do`)
//         ),
//         registerListener("PRINT", (data) =>
//             console.log(`I eat pickles right of the ${data}`)
//         ),
//         emit("PRINT", "Can"),
//         removeListener("PRINT"),
//         emit("PRINT", "Can")
//     );


//     render() {
//         return (
//             <div>
//                 <h1>Action Listener</h1>
//                 <p>Action Listener</p>
//             </div>
//         );
//     }
// }


// actionListener = new MyActionListener();
// actionListener.registerListener("PRINT", (data) =>
// console.log(`Don't tell me what I ${data} or ${data}'t do`)
// );
// actionListener.registerListener("PRINT", (data) =>
// console.log(`I eat pickles right of the ${data}`)
// );
// actionListener.emit("PRINT", "Can");
// actionListener.removeListener("PRINT");
// actionListener.emit("PRINT", "Can");



