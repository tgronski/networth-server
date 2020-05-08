function makeUsersArray(){
    return [
    {
      id: 1,
      user_name: 'test-user-1',
      full_name: 'Test user 1',
      nickname: 'TU1',
      password: 'password',
      date_created: new Date('2029-01-22T16:28:32.615Z'),
    }
    ]
}

function makeWalletsArray(){
    
    return [
        {
            id: 1,
            wallet_categories: 'Loans',
            assets: false, 
            date_created:  new Date('2029-01-22T16:28:32.615Z'),
            user_id: null
            
        }
    ]
}

function makeAdviceArray(){
    return [
        {
            id: 1,
            category: 1,
            content: 'www.sofi.com',
            
        }
    ]
}

function makeGoalsArray(testUsers){

    
    return [
        {
            id: 1,
            goal_value: 100, 
            goal_name:  'Buy a home',
            user_id: testUsers[0].id
            
        }
    ]
}

function makeExpectedWallet(users, wallet) {
    const wallet = users
      .find(user => user.id === wallet.wallet_id)
  
    return {
        wallet_categories: wallet.wallet_categories,
        assets: wallet.assets, 
        date_created: new Date(),
        user_id: null
      }
}
  
  function makeWalletsFixtures() {
    const testUsers = makeUsersArray()
    const testWallets = makeWalletsArray(testUsers)
    return { testUsers, testWallets }
  }

  function makeCalculationsArray(){
    return [
        {
            id: 1,
            networth_credits: 100,
            networth_investments: 0 ,
            networth_savings:0,
            networth_loans:0,
            networth_total: '$100.00',
            networth_total_value: 100,
            user_id: 1
            
        }
    ]
}

function makeExpectedCalculations(users, calculations) {
    const calculations = users
      .find(user => user.id === calculations.calculations_id)
  
    return {
        networth_credits: calculations.networth_credits,
        networth_investments: calculations.networth_investments ,
        networth_savings:calculations.networth_savings,
        networth_loans:calculations.networth_loans,
        networth_total: calculations.networth_total,
        networth_total_value: calculations.networth_total_value,
        user_id: 1
      }
}
  
  function makeCalculationsFixtures() {
    const testUsers = makeUsersArray()
    const testCalculations = makeCalculationsArray(testUsers)
    return { testUsers, testCalculations }
  }


module.exports = {
    makeUsersArray,
    makeWalletsArray,
    makeAdviceArray,
    makeGoalsArray,
    makeExpectedWallet,
    makeWalletsFixtures,
    makeCalculationsArray,
    makeExpectedCalculations,
    makeCalculationsFixtures
}