function atualizarDadosUsuario(idUsuario) {
    const tokenAutenticacao = localStorage.getItem('token');
    const formularioAtualizacao = document.getElementById('formAtualizacao');
  
    formularioAtualizacao.addEventListener('submit', function (evento) {
      evento.preventDefault();
  
      const nomeCompleto = document.getElementById('nomeUsuario').value;
      const enderecoEmail = document.getElementById('emailUsuario').value;
      const senhaAcesso = document.getElementById('senhaUsuario').value;
  
      const regraSenha = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  
      if (!regraSenha.test(senhaAcesso)) {
        msgAtualizacao.textContent = 'A senha deve ter pelo menos 8 caractere, além de uma letra maiúscula, uma letra minúscula, um número e um caractere especial';
        return;
      }
  
      const dadosUsuario = {
        nomeCompleto: nomeCompleto,
        enderecoEmail: enderecoEmail,
        senhaAcesso: senhaAcesso,
      };
  
      fetch(`http://localhost:8000/api/user/atualizar/${idUsuario}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokenAutenticacao}`
        },
        body: JSON.stringify(dadosUsuario)
      })
        .then(resposta => resposta.json())
        .then(dados => {
          if (dados.status === 200) {
            msgAtualizacao.textContent = `Usuário ${nomeCompleto} foi atualizado com sucesso!`;
            formularioAtualizacao.reset();
          } else {
            msgAtualizacao.textContent = 'Erro ao atualizar usuário: ' + dados.message;
          }
        })
        .catch(erro => {
          msgAtualizacao.textContent = 'Erro ao realizar a atualização. Tente novamente.' + ' Erro: ' + erro.message;
        });
    });
  }
  