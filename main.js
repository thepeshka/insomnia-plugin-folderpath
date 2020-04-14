module.exports.templateTags = [{
  name: 'folderpath',
  displayName: 'Folder Path',
  description: 'Generate path from folder parents',
  args: [
    {
      displayName: 'Start from',
      description: 'Index of the folder where you want to start building',
      type: 'number',
      defaultValue: 0
    },
    {
      displayName: 'Add self',
      description: 'Add request name at the end of the path',
      type: 'boolean',
      defaultValue: false
    },
    {
      displayName: 'Trailing slash',
      description: 'Add slash at the end',
      type: 'boolean',
      defaultValue: false
    }
  ],
  async run (context, startFrom, addSelf, trailingSlash) {
    const { meta } = context;
    const request = await context.util.models.request.getById(meta.requestId);
    const ancestors = await context.util.models.request.getAncestors(request);
    const parts = ancestors.reverse().slice(startFrom + 1).map(f => f.name);
    addSelf && parts.push(request.name);
    trailingSlash && parts.push('');
    return parts.join('/');
  }
}];