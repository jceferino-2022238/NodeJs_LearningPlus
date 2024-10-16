export const isAdmin = (req, res, next) =>{
    const user = req.user;
    if(user.role === "ADMIN_ROLE") return next();
    return res.status(400).json({msg: `You need an admin role`})
}

export const isEditor = (req, res, next) =>{
    const user = req.user;
    if(user.role === "EDITOR_ROLE") return next();
    return res.status(400).json({msg: `You need an editor role`})
}

export const isUser = (req, res, next) =>{
    const user = req.user;
    if(user.role === "USER_ROLE") return next();
    return res.status(400).json({msg: `You need to be registered in LearningPlus`})
}

export const isAdminOrEditor = (req, res, next) =>{
    const user = req.user;
    if(user.role === "ADMIN_ROLE" || user.role === "EDITOR_ROLE"){
        return next()
    }
    return res.status(400).json({msg: `You need to be an admin or editor to access this function, your role is ${user.role}`})
}

export const isDefaultOrAdmin = (req, res, next) =>{
    const user = req.user;
    if(user.role === "DEFAULT_ADMIN" || user.role === "ADMIN_ROLE"){
        return next()
    }
    return res.status(400).json({msg: `You need to be the deafult admin user or an admin to access this function, your role is ${user.role}`})
}

export const isDefaultOrAdminOrEditor = (req, res, next) =>{
    const user = req.user;
    if(user.role === "DEFAULT_ADMIN" || user.role === "ADMIN_ROLE" || user.role === "EDITOR_ROLE"){
        return next()
    }
    return res.status(400).json({msg: `You need to be part of our platform team, your are loged with ${user.rike}`})
}