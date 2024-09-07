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
})()