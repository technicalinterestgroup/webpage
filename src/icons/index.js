// 加载 icons svg
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(require.context('./svg', false, /\.svg$/))
