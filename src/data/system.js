//Code source - https://medium.com/@sitapati/avoiding-mutable-global-state-in-browser-js-89437eaebaac
export const GlobalMemberStore = (() => {
  let _members = []
  const needsArg = arg => {
    if (!arg) {
      throw new Error (`Undefined passed as argument to Store!`)
    }
    return arg
  }
  const needsId = member => {
    if (!member.id) {
      throw new Error (`Undefined id on member passed as argument to Store!`)
    }
    return member
  }
  const Store = {
    setMembers: members => (_members = members.map(m => ({...m}))),
    getMembers: () => _members.map(m => ({...m})),
    getMember: id => {
      const member = _members.filter(m => m.id === id)
      return member.length === 1 ? 
        { found: true, member: {...member[0]}} :
        { found: false, member: undefined }
    },
    putMember: member => {
      const m = needsId(needsArg(member))
      if (Store.getMember(m.id).found) {
        throw new Error(`${m.id} already exists!`)
      }
      _members = [..._members, {...m}]
    },
    updateMember: update => {
      const u = needsId(needsArg(update))
      if (!Store.getMember(u.id).found) {
        throw new Error(`${u.id} does not exists!`)
      }
      _members = _members.map(m => m.id === u.id ? 
                              {...update} : m)
    }
  }
  return Object.freeze(Store)
})();

//Class to maintain a common queue of new vehicles to be added to the road.
//This is used in adhering to the user selected vehicle per hour traffic density
export class Queue {
  constructor() {
      this.items = [];
  }

  // Add an element to the queue
  enqueue(element) {
      this.items.push(element);
  }

  // Remove and return the first element from the queue
  dequeue() {
      if (this.isEmpty()) {
          return "Queue is empty";
      }
      return this.items.shift();
  }

  // Check if the queue is empty
  isEmpty() {
      return this.items.length === 0;
  }

  // Get the first element of the queue without removing it
  front() {
      if (this.isEmpty()) {
          return "Queue is empty";
      }
      return this.items[0];
  }

  // Get the size of the queue
  size() {
      return this.items.length;
  }

  // Print the elements of the queue
  printQueue() {
      console.log(this.items.join(', '));
  }
}