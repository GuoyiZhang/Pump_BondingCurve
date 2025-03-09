# DeFi 计算器集合

这是一个基于网页的 DeFi 计算器集合，主要用于模拟和计算 Uniswap V2 和 Bonding Curve 相关的交易参数。

## 功能概述

该项目包含以下主要计算器：

1. Uniswap 价格计算器
   - 支持 USDT 和 ETH 作为基础货币
   - 实时价格获取功能
   - 详细的交易预览和滑点计算
   - 流动性分析

2. Bonding Curve 计算器系列
   - V1 版本: 10亿发行量，初始6000U
   - V2 版本: 针对不同参数的优化版本
   - V3 版本: 1亿发行量，初始5000U的实现

## 技术实现

### 前端技术栈
- 纯原生 HTML/CSS/JavaScript 实现
- Chart.js 用于图表展示
- 响应式设计

### 核心算法

#### Uniswap 计算器
- 恒定乘积公式: `k = token数量 × 基础货币数量`
- 价格计算: `price = 基础货币数量 / token数量`
- 滑点计算: `slippage = (实际成交价 - 当前价格) / 当前价格 × 100%`
- 流动性计算: `liquidity = 基础货币数量 × 2`

#### Bonding Curve 计算器
- 代币发行量计算: `y = initialY - (k / (initialX + x))`
- 价格计算: `price = (initialX + x)^2 / k`
- 市值计算: `marketCap = totalSupply × price`

## 文件结构

- `index.html`: 项目主页面，提供各计算器入口
- `uniswap.html`: Uniswap V2 价格计算器
- `bondingEth.html`: Bonding Curve V2 计算器
- `bondingEth-TITI.html`: Bonding Curve V1 计算器
- `bondingEth2.html`: Bonding Curve 优化版本 (1亿发行量)
- `bondingEth3.html`: Bonding Curve 最终版本
- `.gitattributes`: Git 文件属性配置

## 使用说明

### Uniswap 计算器
1. 选择基础货币 (USDT/ETH)
2. 输入池子中的基础货币和代币数量
3. 输入交易数量
4. 选择交易类型 (买入/卖出)
5. 查看详细的交易预览和影响分析

### Bonding Curve 计算器
1. 查看初始参数设置
2. 输入投入的基础货币数量
3. 查看代币获得量、价格和市值变化
4. 使用图表直观了解价格变化趋势

## 注意事项

1. 所有计算都是基于理想情况，实际交易可能会有所偏差
2. ETH 价格获取功能依赖于 Binance API
3. 大额交易建议分批进行以减少滑点影响
4. 计算器仅供参考，不构成投资建议

## 开发说明

项目使用纯前端技术栈，无需后端服务器。如需部署，直接将所有文件放置于 Web 服务器即可。

### 本地开发
1. 克隆仓库
2. 使用任意 Web 服务器托管文件
3. 在浏览器中访问 index.html

### 代码维护
- 保持算法计算的准确性
- 定期更新 ETH 价格 API
- 确保响应式设计的兼容性 