HISTFILE=~/.histfile
HISTSIZE=1000
SAVEHIST=1000

autoload -Uz compinit
compinit

# starship prompt
eval "$(starship init zsh)"

alias ls="ls -hF --color=tty"
alias la="ls -hFa --color=tty"
alias ll="ls -hFl --color=tty"

alias config='/usr/bin/git --git-dir=$HOME/.dotfiles --work-tree=$HOME'

source /usr/share/zsh/plugins/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh
